'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { ESPLoader, FlashOptions, LoaderOptions, Transport } from 'esptool-js';
import { ChevronDown } from 'lucide-react';

interface FlashProgress {
  stage: 'idle' | 'connecting' | 'downloading' | 'flashing' | 'verifying' | 'complete' | 'error';
  message: string;
  progress: number;
}

interface Version {
  version: string;
  date: string;
  changes: string[];
  files: {
    bootloader: string;
    partitions: string;
    firmware: string;
  };
}

interface VersionsData {
  versions: Version[];
}

const SERIAL_BAUDRATE = 921600;

// Convert ArrayBuffer to binary string (esptool-js expects raw binary, not base64)
function arrayBufferToBinaryString(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return binary;
}

export default function FirmwareUploader() {
  const { t } = useI18n();
  const { uploader } = t;
  
  const [progress, setProgress] = useState<FlashProgress>({
    stage: 'idle',
    message: 'Ready to flash',
    progress: 0
  });
  const [isBrowserSupported, setIsBrowserSupported] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [versionsLoading, setVersionsLoading] = useState(true);
  
  const portRef = useRef<SerialPort | null>(null);
  const transportRef = useRef<Transport | null>(null);

  // Check browser support after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsBrowserSupported('serial' in navigator);
  }, []);

  // Fetch available versions on mount
  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch('/firmware/versions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch versions');
        }
        const data: VersionsData = await response.json();
        setVersions(data.versions);
        // Default to latest version (first in array)
        if (data.versions.length > 0) {
          setSelectedVersion(data.versions[0].version);
        }
      } catch (err) {
        console.error('Failed to load versions:', err);
      } finally {
        setVersionsLoading(false);
      }
    };

    fetchVersions();
  }, []);

  const requestPort = async () => {
    // Reuse the existing port if it is stored and fully closed
    if (portRef.current && !portRef.current.readable && !portRef.current.writable) {
      return portRef.current;
    }
    try {
      const port = await navigator.serial.requestPort({
        filters: [
          { usbVendorId: 0x10c4 }, // Silicon Labs (CP210x)
          { usbVendorId: 0x1a86 }, // QinHeng (CH340)
          { usbVendorId: 0x0403 }, // FTDI
          { usbVendorId: 0x303a }  // Espressif
        ]
      });
      portRef.current = port;
      return port;
    } catch (err) {
      console.error('Failed to get serial port:', err);
      throw new Error('USB device not selected or not accessible');
    }
  };

  // Disconnect transport first (releases stream locks), then close the port.
  // This order is required: SerialPort.close() throws "stream is locked" if
  // the Transport's reader/writer are not released beforehand.
  const cleanupPort = async () => {
    if (transportRef.current) {
      try {
        await transportRef.current.disconnect();
      } catch (e) {
        console.warn('Transport disconnect failed during cleanup:', e);
      }
      transportRef.current = null;
    }
    if (portRef.current && (portRef.current.readable || portRef.current.writable)) {
      try {
        await portRef.current.close();
      } catch (e) {
        console.warn('Port close failed during cleanup:', e);
      }
    }
  };

  const fetchFirmwareFiles = async (version: Version) => {
    setProgress(prev => ({ ...prev, stage: 'downloading', message: uploader.button.downloading, progress: 0 }));

    const base = `/firmware/${version.version}`;
    try {
      const [bootloaderRes, partitionsRes, firmwareRes] = await Promise.all([
        fetch(`${base}/${version.files.bootloader}`),
        fetch(`${base}/${version.files.partitions}`),
        fetch(`${base}/${version.files.firmware}`)
      ]);

      if (!bootloaderRes.ok || !partitionsRes.ok || !firmwareRes.ok) {
        throw new Error('Failed to download firmware files');
      }

      const bootloader = await bootloaderRes.arrayBuffer();
      const partitions = await partitionsRes.arrayBuffer();
      const firmware = await firmwareRes.arrayBuffer();

      setProgress(prev => ({ ...prev, progress: 100 }));
      
      return [
        { data: arrayBufferToBinaryString(bootloader), address: 0x1000 },
        { data: arrayBufferToBinaryString(partitions), address: 0x8000 },
        { data: arrayBufferToBinaryString(firmware), address: 0x10000 }
      ];
    } catch (err) {
      throw new Error('Failed to download firmware files: ' + (err as Error).message);
    }
  };

  const flashDevice = async (version: Version) => {
    if (!portRef.current) {
      throw new Error('No USB device connected');
    }

    setProgress({ stage: 'flashing', message: 'Connecting to device...', progress: 0 });

    try {
      // Ensure port is fully closed before opening. cleanupPort() disconnects
      // the Transport first to release stream locks, then closes the port.
      if (portRef.current.readable || portRef.current.writable) {
        await cleanupPort();
        await new Promise(resolve => setTimeout(resolve, 200)); // USB CDC ACM settling
      }

      // If the port is still open after cleanup, something external is holding
      // a lock — surface a clear error rather than failing inside esptool-js.
      if (portRef.current.readable || portRef.current.writable) {
        throw new Error('Could not close the serial port. Please unplug and replug the device.');
      }

      // Do NOT call port.open() here — Transport.connect() (called internally
      // by esploader.main()) opens the port itself. Opening it here too causes
      // "The port is already open" on the Transport's connect call.
      const transport = new Transport(portRef.current);
      transportRef.current = transport;
      
      const loaderOptions: LoaderOptions = {
        transport,
        baudrate: SERIAL_BAUDRATE,
        romBaudrate: 115200,
        terminal: {
          clean: () => {},
          writeLine: (data: string) => console.log('[ESP]', data),
          write: (data: string) => console.log(data)
        }
      };

      const esploader = new ESPLoader(loaderOptions);

      setProgress(prev => ({ ...prev, message: 'Initializing chip...', progress: 10 }));
      
      const chip = await esploader.main();
      console.log('Connected to:', chip);

      setProgress(prev => ({ ...prev, message: 'Preparing flash...', progress: 20 }));

      const flashFiles = await fetchFirmwareFiles(version);

      setProgress(prev => ({ ...prev, message: uploader.button.flashing, progress: 30 }));

      const fileArray = flashFiles.map(f => ({ 
        data: f.data, 
        address: f.address 
      }));

      const flashOptions: FlashOptions = {
        fileArray,
        flashSize: 'keep',
        flashMode: 'dio',
        flashFreq: '40m',
        eraseAll: false,
        compress: true,
        reportProgress: (fileIndex: number, written: number, total: number) => {
          const fileProgress = (written / total) * 100;
          const totalFilesProgress = ((fileIndex + fileProgress / 100) / flashFiles.length) * 60;
          const totalProgress = 30 + totalFilesProgress;
          setProgress(prev => ({
            ...prev,
            progress: Math.min(90, totalProgress),
            message: `${uploader.button.flashing} ${fileIndex + 1}/${flashFiles.length} (${Math.round(fileProgress)}%)...`
          }));
        }
      };

      await esploader.writeFlash(flashOptions);

      setProgress({ stage: 'complete', message: 'Flash complete! Device restarting...', progress: 100 });

      // Hard reset via RTS (RTS→EN, DTR→GPIO0 on CH340/CYD boards).
      // Assert reset with GPIO0 HIGH so the chip boots normally (not download mode).
      await transport.setRTS(true);   // EN LOW  → hold in reset
      await transport.setDTR(false);  // GPIO0 HIGH → normal boot mode
      await new Promise(resolve => setTimeout(resolve, 100));
      await transport.setRTS(false);  // EN HIGH → release reset, chip boots

      // Close the port so it is in a clean state for any subsequent flash attempt
      await cleanupPort();

    } catch (err) {
      console.error('Flash error:', err);
      await cleanupPort();
      throw err;
    }
  };

  const handleFlash = async () => {
    const version = versions.find(v => v.version === selectedVersion);
    if (!version) {
      setProgress({ stage: 'error', message: 'No firmware version selected', progress: 0 });
      return;
    }

    try {
      setProgress({ stage: 'connecting', message: uploader.button.connecting, progress: 0 });

      await requestPort();
      await flashDevice(version);
      
    } catch (err) {
      setProgress({
        stage: 'error',
        message: (err as Error).message || 'Unknown error occurred',
        progress: 0
      });
    }
  };

  const getProgressColor = () => {
    switch (progress.stage) {
      case 'complete': return 'bg-green-600';
      case 'error': return 'bg-sbb-red';
      case 'flashing': return 'bg-accent-blue';
      default: return 'bg-accent-blue';
    }
  };

  const getSelectedVersionInfo = () => {
    return versions.find(v => v.version === selectedVersion);
  };

  // Show loading state during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-neutral-white rounded-xl shadow-lg p-8 border border-neutral-cloud">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-charcoal mb-2">{uploader.title}</h2>
            <p className="text-neutral-metal">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isBrowserSupported) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-sbb-red border border-sbb-red125 rounded-lg">
        <h3 className="text-lg font-semibold text-neutral-white mb-2">{uploader.browserNotSupported.title}</h3>
        <p className="text-neutral-white/90">
          {uploader.browserNotSupported.message}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-neutral-white rounded-xl shadow-lg p-8 border border-neutral-cloud">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-charcoal mb-2">{uploader.title}</h2>
          <p className="text-neutral-metal">
            {uploader.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {/* Version Selector */}
          <div className="relative">
            <label htmlFor="version-select" className="block text-sm font-medium text-neutral-granite mb-2">
              {uploader.selectVersion}
            </label>
            <div className="relative">
              <select
                id="version-select"
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                disabled={versionsLoading || progress.stage !== 'idle'}
                className="block w-full pl-4 pr-10 py-3 text-base border-neutral-silver focus:outline-none focus:ring-sbb-red focus:border-sbb-red sm:text-sm rounded-lg border bg-neutral-white text-neutral-iron disabled:bg-neutral-milk disabled:text-neutral-smoke appearance-none cursor-pointer"
              >
                {versionsLoading ? (
                  <option>Loading versions...</option>
                ) : (
                  versions.map((version, index) => (
                    <option key={version.version} value={version.version}>
                      v{version.version} {index === 0 ? '(Latest)' : ''}
                    </option>
                  ))
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-granite">
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
            {getSelectedVersionInfo() && (
              <p className="mt-2 text-xs text-neutral-smoke">
                {uploader.released.replace('{date}', new Date(getSelectedVersionInfo()!.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }))}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-neutral-granite">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center text-xs font-bold">1</span>
              <span>{uploader.step1}</span>
            </div>
            <div className="w-8 h-px bg-neutral-silver"></div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center text-xs font-bold">2</span>
              <span>{uploader.step2}</span>
            </div>
            <div className="w-8 h-px bg-neutral-silver"></div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center text-xs font-bold">3</span>
              <span>{uploader.step3}</span>
            </div>
          </div>

          <button
            onClick={handleFlash}
            disabled={progress.stage !== 'idle' && progress.stage !== 'error' && progress.stage !== 'complete'}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
              progress.stage === 'complete'
                ? 'bg-green-600 text-neutral-white hover:bg-green-700'
                : progress.stage === 'error'
                ? 'bg-sbb-red text-neutral-white hover:bg-sbb-red125'
                : progress.stage !== 'idle'
                ? 'bg-neutral-cement text-neutral-white cursor-not-allowed'
                : 'bg-sbb-red text-neutral-white hover:bg-sbb-red125 hover:shadow-lg'
            }`}
          >
            {progress.stage === 'idle' && uploader.button.idle.replace('{version}', selectedVersion || 'Latest')}
            {progress.stage === 'connecting' && uploader.button.connecting}
            {progress.stage === 'downloading' && uploader.button.downloading}
            {progress.stage === 'flashing' && uploader.button.flashing}
            {progress.stage === 'verifying' && uploader.button.verifying}
            {progress.stage === 'complete' && uploader.button.complete}
            {progress.stage === 'error' && uploader.button.error}
          </button>

          {(progress.stage !== 'idle' || progress.message !== 'Ready to flash') && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-metal">{progress.message}</span>
                <span className="text-neutral-charcoal font-medium">{Math.round(progress.progress)}%</span>
              </div>
              <div className="w-full h-3 bg-neutral-cloud rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ease-out ${getProgressColor()}`}
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="text-xs text-neutral-smoke text-center space-y-1">
            <p>{uploader.deviceInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
