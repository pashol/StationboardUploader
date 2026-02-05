'use client';

import { Train, Zap, Moon, Bitcoin, Wifi, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Train,
    title: 'Real-Time Departures',
    description: 'Live Swiss public transport data for trains, buses, trams, and boats. Never miss your connection again.'
  },
  {
    icon: Zap,
    title: 'Dual Station Support',
    description: 'Configure two stations and switch between them with a double-click. Perfect for commuters.'
  },
  {
    icon: Moon,
    title: '5 Brightness Levels',
    description: 'From power-saving sleep mode to full brightness. Automatic night mode from 22:00 to 06:00.'
  },
  {
    icon: Bitcoin,
    title: 'BTC Price Ticker',
    description: 'Optional cryptocurrency price display in the footer for the crypto enthusiasts.'
  },
  {
    icon: Wifi,
    title: 'WiFi Configuration',
    description: 'Easy setup via smartphone captive portal. No computer required for configuration.'
  },
  {
    icon: Smartphone,
    title: 'OTA Updates',
    description: 'Wireless firmware updates via web browser. Keep your device up to date effortlessly.'
  }
];

export default function MarketingSection() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Swiss Public Transport Display for Home
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bring the train station departure board to your home or office. 
            Get accurate real-time departure times right where you need them.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flash Firmware</h4>
              <p className="text-gray-600 text-sm">Connect your ESP32 via USB and click the flash button above</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Configure WiFi</h4>
              <p className="text-gray-600 text-sm">Connect to the "Stationboard-AP" network and set up your stations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Enjoy!</h4>
              <p className="text-gray-600 text-sm">Your StationBoard will display live departures automatically</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">&lt;1W</div>
              <div className="text-blue-100">Power Consumption</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Swiss</div>
              <div className="text-blue-100">Made Quality</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Open</div>
              <div className="text-blue-100">Source</div>
            </div>
          </div>
        </div>

        {/* Hardware Specs */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Hardware Requirements</h3>
          <div className="bg-white rounded-xl shadow-sm p-6 inline-block">
            <p className="text-gray-700 mb-2">
              <strong>ESP32-2432S028R</strong> (CYD - "Cheap Yellow Display")
            </p>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>ESP32 with integrated 2.8" ILI9341 TFT display (320x240)</li>
              <li>Built-in boot button for controls</li>
              <li>USB power supply (5V)</li>
              <li>2.4 GHz WiFi network</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
