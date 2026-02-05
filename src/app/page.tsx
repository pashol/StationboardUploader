import FirmwareUploader from "@/components/FirmwareUploader";
import MarketingSection from "@/components/MarketingSection";
import VersionNotes from "@/components/VersionNotes";
import LanguageSelector from "@/components/LanguageSelector";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n/I18nContext";

function Header() {
  return (
    <header className="bg-neutral-white border-b border-neutral-cloud sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sbb-red rounded-lg flex items-center justify-center">
              <span className="text-neutral-white font-bold text-lg">SB</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-charcoal">StationBoard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <a
              href="https://github.com/pashol/Stationboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-granite hover:text-neutral-charcoal text-sm font-medium transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function PageContent() {
  return (
    <>
      <Header />

      {/* Marketing Section - Now First */}
      <MarketingSection />

      {/* Firmware Uploader Section - Now Second */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-milk">
        <div className="max-w-7xl mx-auto">
          <FirmwareUploader />
        </div>
      </section>

      {/* Version Notes Section */}
      <VersionNotes />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <main className="min-h-screen bg-neutral-white">
        <PageContent />
      </main>
    </I18nProvider>
  );
}
