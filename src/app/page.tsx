import FirmwareUploader from "@/components/FirmwareUploader";
import MarketingSection from "@/components/MarketingSection";
import VersionNotes from "@/components/VersionNotes";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SB</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">StationBoard</h1>
            </div>
            <a
              href="https://github.com/pashol/Stationboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Firmware Uploader Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Firmware Uploader
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Flash the latest firmware directly from your browser. No software installation required.
            </p>
          </div>
          <FirmwareUploader />
        </div>
      </section>

      {/* Marketing Section */}
      <MarketingSection />

      {/* Version Notes Section */}
      <VersionNotes />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-lg">StationBoard</span>
              <p className="text-gray-400 text-sm mt-1">
                Swiss Public Transport Display for Home
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a
                href="https://github.com/pashol/Stationboard"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Open Source
              </a>
              <span>|</span>
              <span>Made with ❤️ in Switzerland</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
