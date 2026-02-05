# AGENTS.md - StationBoard Uploader

## Project Overview

Next.js 14 web application for flashing ESP32 firmware. Web-based firmware uploader for StationBoard Swiss transport display devices.

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
import { formatDate } from '@/lib/utils';
```

### Naming Conventions

- **Components**: PascalCase (e.g., `FirmwareUploader`)
- **Functions**: camelCase (e.g., `handleFlash`, `fetchVersions`)
- **Variables**: camelCase (e.g., `selectedVersion`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `SERIAL_BAUDRATE`)
- **Interfaces/Types**: PascalCase with descriptive names
- **Files**: kebab-case for utilities (e.g., `translations.ts`), PascalCase for components
- **CSS classes**: Tailwind utility classes, no custom CSS unless necessary

### Error Handling

- Use try/catch for async operations
- Log errors to console with context: `console.error('Flash error:', err)`
- User-facing errors stored in state and displayed in UI
- Type assertions for error messages: `(err as Error).message`

### Hooks Usage

- **useState** for component state
- **useEffect** for side effects (fetching data, subscriptions)
- **useRef** for DOM references and mutable values
- **useCallback** for memoized callbacks (when needed)
- **Custom hooks** extracted to `@/lib/hooks/` when reused

### Styling

- **Tailwind CSS** for all styling
- Use arbitrary values sparingly: `w-[100px]` only when necessary
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Color scheme: Use Tailwind defaults (blue-600, gray-900, etc.)
- Dark mode support via CSS variables in `globals.css`

### Project Structure

```
src/
  app/              # Next.js App Router
    layout.tsx      # Root layout with fonts
    page.tsx        # Home page
    globals.css     # Global styles
    fonts/          # Local font files
  components/       # React components
    *.tsx
  lib/              # Utilities, hooks, contexts
    i18n/           # Internationalization
      I18nContext.tsx
      translations.ts
public/             # Static assets
```

### Internationalization (i18n)

- Supported languages: English (en), German (de), French (fr), Italian (it)
- All user-facing strings in `translations.ts`
- Use `useI18n()` hook to access translations
- Access nested translations via destructuring: `const { uploader } = t;`

### Environment & Browser APIs

- Check for browser APIs before use: `'serial' in navigator`
- Handle SSR hydration with `mounted` state check
- Store user preferences in `localStorage` when appropriate

## Dependencies

Key libraries used:
- `next` - React framework
- `react`, `react-dom` - React
- `esptool-js` - ESP32 flashing library
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `typescript` - Type checking
- `eslint` - Linting (Next.js config)

## Important Notes

- **Static export**: Configured in `next.config.mjs` with `output: 'export'`
- **Dist directory**: Output goes to `dist/` (not `.next/`)
- **Images**: Unoptimized for static export (`images: { unoptimized: true }`)
- **Web Serial API**: Requires Chrome, Edge, or Opera for ESP32 flashing
- No test suite configured - add tests if implementing new features
