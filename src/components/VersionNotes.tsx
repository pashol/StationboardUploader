'use client';

import { useEffect, useState } from 'react';
import { Download, Clock, ChevronDown, ChevronUp } from 'lucide-react';

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

export default function VersionNotes() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch('/firmware/versions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch versions');
        }
        const data: VersionsData = await response.json();
        setVersions(data.versions);
        // Expand the first (latest) version by default
        if (data.versions.length > 0) {
          setExpandedVersion(data.versions[0].version);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleExpand = (version: string) => {
    setExpandedVersion(expandedVersion === version ? null : version);
  };

  if (loading) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-red-600">Failed to load version history: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Version History</h2>
          <p className="text-gray-600">
            Latest firmware updates and improvements for your StationBoard
          </p>
        </div>

        <div className="space-y-4">
          {versions.map((version, index) => (
            <div
              key={version.version}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                index === 0
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <button
                onClick={() => toggleExpand(version.version)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-opacity-80 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-bold text-gray-900">
                        v{version.version}
                      </span>
                      {index === 0 && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                          Latest
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(version.date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href="/firmware/firmware.bin"
                    download={`stationboard-v${version.version}.bin`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>.bin</span>
                  </a>
                  {expandedVersion === version.version ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedVersion === version.version && (
                <div className="px-6 pb-4 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Changes:</h4>
                  <ul className="space-y-2">
                    {version.changes.map((change, changeIndex) => (
                      <li
                        key={changeIndex}
                        className="flex items-start text-gray-700"
                      >
                        <span className="mr-2 text-blue-600">•</span>
                        <span className="text-sm">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <strong>Note:</strong> Use the uploader above for automatic flashing, or download the .bin file for manual flashing with esptool.py or ESP Flash Download Tools.
          </p>
        </div>
      </div>
    </section>
  );
}
