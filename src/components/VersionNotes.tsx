'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
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
  const { t } = useI18n();
  const { versions: versionsT } = t;
  
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
    return date.toLocaleDateString(undefined, {
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
      <section className="w-full py-16 bg-neutral-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-cloud rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-neutral-cloud rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16 bg-neutral-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sbb-red">Failed to load version history: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-neutral-milk">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-charcoal mb-4">{versionsT.title}</h2>
          <p className="text-neutral-metal">
            {versionsT.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {versions.map((version, index) => (
            <div
              key={version.version}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                index === 0
                  ? 'border-accent-blue/20 bg-accent-blue/5'
                  : 'border-neutral-cloud bg-neutral-white'
              }`}
            >
              <button
                onClick={() => toggleExpand(version.version)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-opacity-80 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-bold text-neutral-charcoal">
                        v{version.version}
                      </span>
                      {index === 0 && (
                        <span className="px-2 py-1 bg-accent-blue text-neutral-white text-xs font-medium rounded-full">
                          Latest
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-neutral-smoke mt-1">
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
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-neutral-granite bg-neutral-white border border-neutral-silver rounded-lg hover:bg-neutral-milk hover:text-neutral-charcoal transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{versionsT.download}</span>
                  </a>
                  {expandedVersion === version.version ? (
                    <ChevronUp className="w-5 h-5 text-neutral-smoke" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-smoke" />
                  )}
                </div>
              </button>

              {expandedVersion === version.version && (
                <div className="px-6 pb-4 border-t border-neutral-cloud pt-4">
                  <h4 className="text-sm font-semibold text-neutral-charcoal mb-2">{versionsT.changes}</h4>
                  <ul className="space-y-2">
                    {version.changes.map((change, changeIndex) => (
                      <li
                        key={changeIndex}
                        className="flex items-start text-neutral-granite"
                      >
                        <span className="mr-2 text-accent-blue">•</span>
                        <span className="text-sm">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-neutral-white rounded-lg border border-neutral-cloud">
          <p className="text-sm text-neutral-metal text-center">
            {versionsT.note}
          </p>
        </div>
      </div>
    </section>
  );
}
