# StationBoard Uploader

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)

Web-based firmware uploader for [StationBoard](https://github.com/pashol/Stationboard) - a Swiss public transport display for your home or office. Flash your ESP32-2432S028R directly from the browser without installing any software.

![StationBoard Uploader Screenshot](https://github.com/pashol/StationboardUploader/raw/main/docs/screenshot.png)

## Features

- 🚀 **Browser-based flashing** - No software installation required
- 🌐 **Multi-language support** - English, German, French, Italian
- 📱 **Mobile-friendly** - Works on smartphones and tablets
- ⚡ **Fast flashing** - Optimized for ESP32 devices
- 🔄 **Version selection** - Choose from available firmware versions
- 📊 **Progress tracking** - Real-time flash progress with visual feedback

## Supported Hardware

- **ESP32-2432S028R** (CYD - "Cheap Yellow Display")
- ESP32 with integrated 2.8" ILI9341 TFT display (320x240)
- USB connection (Chrome, Edge, or Opera browser required)

## Browser Requirements

The Web Serial API is required for flashing firmware. Supported browsers:

- ✅ Google Chrome (recommended)
- ✅ Microsoft Edge
- ✅ Opera
- ❌ Safari (not supported)
- ❌ Firefox (not supported)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Development

```bash
# Clone the repository
git clone https://github.com/pashol/StationboardUploader.git
cd StationboardUploader

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create static export
npm run build

# Output will be in dist/ directory
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── FirmwareUploader.tsx   # Main flashing component
│   ├── LanguageSelector.tsx   # Language switcher
│   ├── MarketingSection.tsx   # Landing page content
│   ├── VersionNotes.tsx       # Version history
│   └── Footer.tsx             # Footer component
└── lib/
    └── i18n/              # Internationalization
        ├── I18nContext.tsx
        └── translations.ts

public/
└── firmware/              # Firmware binaries
    ├── bootloader.bin
    ├── partitions.bin
    ├── firmware.bin
    └── versions.json
```

## How It Works

1. **Connect Device** - Plug your ESP32-2432S028R via USB
2. **Select Version** - Choose firmware version from dropdown
3. **Click Flash** - Browser connects via Web Serial API
4. **Wait** - Firmware downloads and flashes automatically
5. **Done!** - Device restarts with new firmware

## Firmware Format

The uploader expects firmware files in `public/firmware/`:

- `bootloader.bin` - ESP32 bootloader (address: 0x1000)
- `partitions.bin` - Partition table (address: 0x8000)
- `firmware.bin` - Main application (address: 0x10000)
- `versions.json` - Version metadata

Example `versions.json`:
```json
{
  "versions": [
    {
      "version": "1.0.0",
      "date": "2024-01-15",
      "changes": ["Initial release"],
      "files": {
        "bootloader": "bootloader.bin",
        "partitions": "partitions.bin",
        "firmware": "firmware.bin"
      }
    }
  ]
}
```

## Internationalization

Supported languages:
- 🇬🇧 English (en)
- 🇩🇪 German (de)
- 🇫🇷 French (fr)
- 🇮🇹 Italian (it)

Translations are stored in `src/lib/i18n/translations.ts`.

## Deployment

This project is configured for static export. Deploy the `dist/` folder to any static hosting service:

- **GitHub Pages** - Push to `gh-pages` branch
- **Vercel** - Connect GitHub repository
- **Netlify** - Drag and drop `dist/` folder
- **AWS S3** - Upload `dist/` contents

## Related Projects

- [StationBoard](https://github.com/pashol/Stationboard) - The ESP32 firmware that this uploader flashes

## Contributing

Contributions are welcome! Please read our [AGENTS.md](./AGENTS.md) for development guidelines.

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

Made with ❤️ in Switzerland
