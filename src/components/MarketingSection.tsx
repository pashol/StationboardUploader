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
    <section className="w-full py-16 bg-neutral-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-charcoal mb-4">
            {marketing.hero.title}
          </h2>
          <p className="text-xl text-neutral-metal max-w-3xl mx-auto">
            {marketing.hero.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-neutral-charcoal mb-8">{marketing.features.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-sbb-red rounded-xl p-6 shadow-sm hover:shadow-lg hover:bg-sbb-red125 transition-all border border-sbb-red150"
              >
                <feature.icon className="w-10 h-10 text-neutral-white mb-4" />
                <h4 className="font-semibold text-neutral-white mb-2">{feature.title}</h4>
                <p className="text-neutral-white/90 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-neutral-milk rounded-2xl shadow-lg p-8 mb-16 border border-neutral-cloud">
          <h3 className="text-2xl font-bold text-center text-neutral-charcoal mb-8">{marketing.howItWorks.title}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-blue">1</span>
              </div>
              <h4 className="font-semibold text-neutral-charcoal mb-2">{marketing.howItWorks.step1.title}</h4>
              <p className="text-neutral-metal text-sm">{marketing.howItWorks.step1.description}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-blue">2</span>
              </div>
              <h4 className="font-semibold text-neutral-charcoal mb-2">{marketing.howItWorks.step2.title}</h4>
              <p className="text-neutral-metal text-sm">{marketing.howItWorks.step2.description}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-blue">3</span>
              </div>
              <h4 className="font-semibold text-neutral-charcoal mb-2">{marketing.howItWorks.step3.title}</h4>
              <p className="text-neutral-metal text-sm">{marketing.howItWorks.step3.description}</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-accent-blue rounded-2xl p-8 text-neutral-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{marketing.trust.power}</div>
              <div className="text-neutral-white/80">{marketing.trust.powerLabel}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{marketing.trust.swiss}</div>
              <div className="text-neutral-white/80">{marketing.trust.swissLabel}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{marketing.trust.openSource}</div>
              <div className="text-neutral-white/80">{marketing.trust.openSourceLabel}</div>
            </div>
          </div>
        </div>

        {/* Hardware Specs */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-neutral-charcoal mb-4">{marketing.hardware.title}</h3>
          <div className="bg-neutral-milk rounded-xl shadow-sm p-6 inline-block border border-neutral-cloud">
            <p className="text-neutral-anthracite mb-2">
              <strong>{marketing.hardware.device.split(' (')[0]}</strong> ({marketing.hardware.device.split(' (')[1]?.replace(')', '') || 'CYD'})
            </p>
            <ul className="text-neutral-metal text-sm space-y-1 text-left">
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
