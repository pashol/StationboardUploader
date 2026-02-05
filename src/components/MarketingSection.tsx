'use client';

import { useI18n } from '@/lib/i18n/I18nContext';
import { Train, Zap, Moon, Bitcoin, Wifi, Smartphone } from 'lucide-react';

export default function MarketingSection() {
  const { t } = useI18n();
  const { marketing } = t;

  const features = [
    {
      icon: Train,
      title: marketing.features.realtimeDepartures.title,
      description: marketing.features.realtimeDepartures.description
    },
    {
      icon: Zap,
      title: marketing.features.dualStations.title,
      description: marketing.features.dualStations.description
    },
    {
      icon: Moon,
      title: marketing.features.brightness.title,
      description: marketing.features.brightness.description
    },
    {
      icon: Bitcoin,
      title: marketing.features.btcTicker.title,
      description: marketing.features.btcTicker.description
    },
    {
      icon: Wifi,
      title: marketing.features.wifi.title,
      description: marketing.features.wifi.description
    },
    {
      icon: Smartphone,
      title: marketing.features.ota.title,
      description: marketing.features.ota.description
    }
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {marketing.hero.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {marketing.hero.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">{marketing.features.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gray-50 rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">{marketing.howItWorks.title}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{marketing.howItWorks.step1.title}</h4>
              <p className="text-gray-600 text-sm">{marketing.howItWorks.step1.description}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{marketing.howItWorks.step2.title}</h4>
              <p className="text-gray-600 text-sm">{marketing.howItWorks.step2.description}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{marketing.howItWorks.step3.title}</h4>
              <p className="text-gray-600 text-sm">{marketing.howItWorks.step3.description}</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{marketing.trust.power}</div>
              <div className="text-blue-100">{marketing.trust.powerLabel}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{marketing.trust.swiss}</div>
              <div className="text-blue-100">{marketing.trust.swissLabel}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{marketing.trust.openSource}</div>
              <div className="text-blue-100">{marketing.trust.openSourceLabel}</div>
            </div>
          </div>
        </div>

        {/* Hardware Specs */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{marketing.hardware.title}</h3>
          <div className="bg-gray-50 rounded-xl shadow-sm p-6 inline-block">
            <p className="text-gray-700 mb-2">
              <strong>{marketing.hardware.device.split(' (')[0]}</strong> ({marketing.hardware.device.split(' (')[1]?.replace(')', '') || 'CYD'})
            </p>
            <ul className="text-gray-600 text-sm space-y-1 text-left">
              {marketing.hardware.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
