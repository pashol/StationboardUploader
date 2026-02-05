'use client';

import { useI18n } from '@/lib/i18n/I18nContext';

export default function Footer() {
  const { t } = useI18n();
  const { footer } = t;

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">{footer.title}</span>
            <p className="text-gray-400 text-sm mt-1">
              {footer.subtitle}
            </p>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a
              href="https://github.com/pashol/Stationboard"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {footer.openSource}
            </a>
            <span>|</span>
            <span>{footer.madeIn}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
