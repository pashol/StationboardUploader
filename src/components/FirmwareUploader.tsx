'use client';

import { useState, useRef } from 'react';
import { ESPLoader, FlashOptions, LoaderOptions, Transport } from 'esptool-js';

interface FlashProgress {
  stage: 'idle' | 'connecting' | 'downloading' | 'flashing' | 'verifying' | 'complete' | 'error';
  message: string;
  progress: number;
}

const SERIAL_BAUDRATE = 921600;

// Convert ArrayBuffer to base64 string
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default function FirmwareUploader() {
  const [progress, setProgress] = useState<FlashProgress>({
    stage: 'idle',
    message: 'Ready to flash',
    progress: 0
  });
  const [isBrowserSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'serial' in navigator;
  });
  
  const portRef = useRef<SerialPort | null>(null);
  const transportRef = useRef<Transport | null>(null);

  const requestPort = async () => {
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

  const fetchFirmwareFiles = async () => {
    setProgress(prev => ({ ...prev, stage: 'downloading', message: 'Downloading firmware files...', progress: 0 }));
    
    try {
      const [bootloaderRes, partitionsRes, firmwareRes] = await Promise.all([
        fetch('/firmware/bootloader.bin'),
        fetch('/firmware/partitions.bin'),
        fetch('/firmware/firmware.bin')
      ]);

      if (!bootloaderRes.ok || !partitionsRes.ok || !firmwareRes.ok) {
        throw new Error('Failed to download firmware files');
      }

      const bootloader = await bootloaderRes.arrayBuffer();
      const partitions = await partitionsRes.arrayBuffer();
      const firmware = await firmwareRes.arrayBuffer();

      setProgress(prev => ({ ...prev, progress: 100 }));
      
      return [
        { data: arrayBufferToBase64(bootloader), address: 0x1000 },
        { data: arrayBufferToBase64(partitions), address: 0x8000 },
        { data: arrayBufferToBase64(firmware), address: 0x10000 }
      ];
    } catch (err) {
      throw new Error('Failed to download firmware files: ' + (err as Error).message);
    }
  };

  const flashDevice = async () => {
    if (!portRef.current) {
      throw new Error('No USB device connected');
    }

    setProgress({ stage: 'flashing', message: 'Connecting to device...', progress: 0 });

    try {
      await portRef.current.open({ baudRate: SERIAL_BAUDRATE });
      
      const transport = new Transport(portRef.current);
      transportRef.current = transport;
      
      const loaderOptions: LoaderOptions = {
        transport,
        baudrate: SERIAL_BAUDRATE,
        romBaudrate: SERIAL_BAUDRATE,
        terminal: {
          clean: () => {},
          writeLine: (data: string) => console.log('[ESP]', data),
          write: (data: string) => process.stdout.write(data)
        }
      };

      const esploader = new ESPLoader(loaderOptions);

      setProgress(prev => ({ ...prev, message: 'Initializing chip...', progress: 10 }));
      
      const chip = await esploader.main();
      console.log('Connected to:', chip);

      setProgress(prev => ({ ...prev, message: 'Preparing flash...', progress: 20 }));

      const flashFiles = await fetchFirmwareFiles();

      setProgress(prev => ({ ...prev, message: 'Flashing firmware...', progress: 30 }));

      const flashOptions: FlashOptions = {
        fileArray: flashFiles,
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
            message: `Flashing part ${fileIndex + 1}/${flashFiles.length} (${Math.round(fileProgress)}%)...`
          }));
        }
      };

      await esploader.writeFlash(flashOptions);

      setProgress({ stage: 'complete', message: 'Flash complete! Device restarting...', progress: 100 });

      // Reset the device
      await transport.setDTR(false);
      await new Promise(resolve => setTimeout(resolve, 100));
      await transport.setDTR(true);

      await transport.disconnect();
      
    } catch (err) {
      console.error('Flash error:', err);
      throw err;
    }
  };

  const handleFlash = async () => {
    try {
      setProgress({ stage: 'connecting', message: 'Waiting for USB device...', progress: 0 });
      
      await requestPort();
      await flashDevice();
      
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
      case 'complete': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'flashing': return 'bg-blue-500';
      default: return 'bg-blue-500';
    }
  };

  if (!isBrowserSupported) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Browser Not Supported</h3>
        <p className="text-yellow-700">
          The Web Serial API is required to flash firmware. Please use Chrome, Edge, or Opera browser.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Flash Your StationBoard</h2>
          <p className="text-gray-600">
            Connect your ESP32-2432S028R via USB and click the button below to flash the latest firmware.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
              <span>Connect USB</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
              <span>Click Flash</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
              <span>Done!</span>
            </div>
          </div>

          <button
            onClick={handleFlash}
            disabled={progress.stage !== 'idle' && progress.stage !== 'error' && progress.stage !== 'complete'}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
              progress.stage === 'complete'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : progress.stage === 'error'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : progress.stage !== 'idle'
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {progress.stage === 'idle' && 'Connect & Flash Firmware'}
            {progress.stage === 'connecting' && 'Connecting...'}
            {progress.stage === 'downloading' && 'Downloading...'}
            {progress.stage === 'flashing' && 'Flashing...'}
            {progress.stage === 'verifying' && 'Verifying...'}
            {progress.stage === 'complete' && 'Flash Complete - Flash Another'}
            {progress.stage === 'error' && 'Try Again'}
          </button>

          {(progress.stage !== 'idle' || progress.message !== 'Ready to flash') && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{progress.message}</span>
                <span className="text-gray-900 font-medium">{Math.round(progress.progress)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ease-out ${getProgressColor()}`}
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>Firmware: v1.2.0 | ESP32-2432S028R (CYD)</p>
            <p>Requires Chrome, Edge, or Opera browser</p>
          </div>
        </div>
      </div>
    </div>
  );
}
