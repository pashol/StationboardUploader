# AGENTS.md - StationBoard Uploader

## Project Overview

Next.js 14 web application for flashing ESP32 firmware. Web-based firmware uploader for StationBoard Swiss transport display devices. Uses the Web Serial API and esptool-js to flash firmware directly from the browser, with no software installation required.

## Build Commands

```bash
# Development server
npm run dev

# Production build (static export to dist/)
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

**Note:** No test runner is currently configured. This project does not have tests yet.

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All strict TypeScript compiler options are active
- **Explicit types** for function parameters, return types, and interface definitions
- Use `interface` for object shapes, `type` for unions/aliases
- Interface names use **PascalCase** (e.g., `FlashProgress`, `Version`)
- Avoid `any` - use proper types or `unknown` with type guards

### React Components

- **File naming**: PascalCase for components (e.g., `FirmwareUploader.tsx`)
- **Default exports** for page and component files
- **'use client'** directive for client-side components (before imports)
- Server components (default in Next.js) don't need the directive
- Props interface defined inline or in the same file
- Destructure props in function parameters

Example:
```tsx
'use client';

import { useState } from 'react';

interface Props {
  title: string;
}

export default function MyComponent({ title }: Props) {
  return <div>{title}</div>;
}
```

### Imports

- **Order**: React imports first, then third-party libraries, then `@/` aliases, then relative imports
- Use `@/` path alias for all internal imports (configured in tsconfig.json)
- Group imports by category with blank lines between

Example:
```tsx
import { useState, useEffect } from 'react';
import { ESPLoader } from 'esptool-js';
import { ChevronDown } from 'lucide-react';

import { useI18n } from '@/lib/i18n/I18nContext';
```

### Naming Conventions

- **Components**: PascalCase (e.g., `FirmwareUploader`)
- **Functions**: camelCase (e.g., `handleFlash`, `fetchVersions`)
- **Variables**: camelCase (e.g., `selectedVersion`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `SERIAL_BAUDRATE`)
- **Interfaces/Types**: PascalCase with descriptive names
- **Files**: kebab-case for utilities (e.g., `translations.ts`), PascalCase for components
- **CSS classes**: Tailwind utility classes with SBB color tokens; no custom CSS unless necessary

### Error Handling

- Use try/catch for async operations
- Log errors to console with context: `console.error('Flash error:', err)`
- User-facing errors stored in state and displayed in UI
- Type assertions for error messages: `(err as Error).message`

### Hooks Usage

- **useState** for component state
- **useEffect** for side effects (fetching data, subscriptions)
- **useRef** for DOM references and mutable values (e.g., `portRef`, `transportRef`)
- **useCallback** for memoized callbacks (when needed)
- **Custom hooks** extracted to `@/lib/hooks/` when reused

### Styling

- **Tailwind CSS** for all styling
- **SBB color palette** — use the semantic tokens defined in `tailwind.config.ts`:
  - Primary action: `bg-sbb-red`, `hover:bg-sbb-red125`
  - Text: `text-neutral-charcoal`, `text-neutral-metal`, `text-neutral-granite`
  - Borders / surfaces: `border-neutral-cloud`, `bg-neutral-white`, `bg-neutral-milk`
  - Accent (progress, step indicators): `bg-accent-blue`, `text-accent-blue`
- Use arbitrary values sparingly: `w-[100px]` only when necessary
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Dark mode support via CSS variables in `globals.css`

### Project Structure

```
src/
  app/              # Next.js App Router
    layout.tsx      # Root layout with Geist local fonts
    page.tsx        # Home page
    globals.css     # Global styles and SBB palette CSS variables
    fonts/          # Local font files (GeistVF.woff, GeistMonoVF.woff)
  components/       # React components
    FirmwareUploader.tsx
    LanguageSelector.tsx
    MarketingSection.tsx
    VersionNotes.tsx
    Footer.tsx
  lib/              # Utilities, hooks, contexts
    i18n/           # Internationalization
      I18nContext.tsx
      translations.ts
public/
  firmware/         # Firmware binaries, organised by version subdirectory
    versions.json
    1.2.1/
      bootloader.bin
      partitions.bin
      firmware.bin
    1.x.x/          # One subdirectory per released version
```

### Firmware Directory Layout

Each firmware release lives in its own subdirectory under `public/firmware/<version>/`. The `versions.json` manifest at `public/firmware/versions.json` lists all available versions in reverse-chronological order (newest first). The uploader fetches files from `/firmware/<version>/<filename>`.

When adding a new firmware release:
1. Create `public/firmware/<new-version>/` and copy the three `.bin` files into it.
2. Prepend a new entry to the `versions` array in `versions.json`.

### Internationalization (i18n)

- Supported languages: English (en), German (de) — **default**, French (fr), Italian (it)
- All user-facing strings in `translations.ts`
- Use `useI18n()` hook to access translations
- Access nested translations via destructuring: `const { uploader } = t;`

### Environment & Browser APIs

- Check for browser APIs before use: `'serial' in navigator`
- Handle SSR hydration with `mounted` state check (render a skeleton until mounted)
- Store user preferences in `localStorage` when appropriate

### Serial Port / esptool-js Patterns

- **Do NOT call `port.open()` manually** — `Transport.connect()` (called internally by `esploader.main()`) opens the port. Opening it beforehand causes a "port is already open" error.
- **Cleanup order matters**: disconnect the `Transport` first (releases stream locks), then close the `SerialPort`. Closing the port while a Transport reader/writer is active throws "stream is locked".
- Store the port and transport in `useRef` so they persist across re-renders without triggering effects.
- USB vendor IDs filtered on `navigator.serial.requestPort`: CP210x (0x10c4), CH340 (0x1a86), FTDI (0x0403), Espressif (0x303a).
- esptool-js expects firmware data as a **binary string** (not base64). Use `arrayBufferToBinaryString` helper to convert `ArrayBuffer` responses before passing to `writeFlash`.

## Dependencies

Key libraries used:
- `next` - React framework (v14)
- `react`, `react-dom` - React (v18)
- `esptool-js` (^0.5.7) - ESP32 flashing library
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `@types/w3c-web-serial` - TypeScript types for Web Serial API
- `typescript` - Type checking
- `eslint` - Linting (Next.js config)

## Important Notes

- **Static export**: Configured in `next.config.mjs` with `output: 'export'`
- **Dist directory**: Output goes to `dist/` (not `.next/`)
- **Images**: Unoptimized for static export (`images: { unoptimized: true }`)
- **Web Serial API**: Requires Chrome, Edge, or Opera for ESP32 flashing; HTTPS or localhost required
- **Default language**: German (`de`)
- **Flash baud rate**: 921600 (ROM baud: 115200)
- No test suite configured - add tests if implementing new features
