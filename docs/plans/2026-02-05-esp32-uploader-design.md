# ESP32 StationBoard Uploader Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a web-based ESP32 firmware uploader using Web Serial API, hosted on Vercel, with marketing content for StationBoard and version notes.

**Architecture:** Next.js 14 static export with three zones - firmware upload (esptool-js), marketing features, and version history. Firmware binaries embedded in /public/firmware/.

**Tech Stack:** Next.js 14 + TypeScript + Tailwind CSS + esptool-js

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: Entire project structure via `create-next-app`

**Step 1: Create Next.js app**

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

**Step 2: Install esptool-js**

```bash
npm install esptool-js
npm install -D @types/w3c-web-serial
```

**Step 3: Commit**

```bash
git add .
git commit -m "chore: initialize Next.js project with esptool-js"
```

---

## Task 2: Configure Static Export for Vercel

**Files:**
- Modify: `next.config.js` (or create next.config.mjs)

**Step 1: Configure static export**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

**Step 2: Commit**

```bash
git add next.config.js
git commit -m "config: enable static export for Vercel"
```

---

## Task 3: Create Firmware Upload Component

**Files:**
- Create: `src/components/FirmwareUploader.tsx`
- Modify: `src/app/page.tsx` to include component

**Step 1: Create FirmwareUploader component**

Complete component with:
- USB connect button (Web Serial API)
- Progress bar for flashing stages
- Error handling and success feedback
- Support for bootloader.bin, partitions.bin, firmware.bin

**Step 2: Import component in page.tsx**

**Step 3: Commit**

```bash
git add src/components/FirmwareUploader.tsx src/app/page.tsx
git commit -m "feat: add firmware uploader with esptool-js"
```

---

## Task 4: Copy Firmware Binaries to Public Directory

**Files:**
- Create: `public/firmware/bootloader.bin`
- Create: `public/firmware/partitions.bin`  
- Create: `public/firmware/firmware.bin`

**Step 1: Copy binaries from StationBoard build**

```bash
mkdir -p public/firmware
cp C:/Users/pasca/Coding/StationBoard/.pio/build/ESP32-2432S028R/bootloader.bin public/firmware/
cp C:/Users/pasca/Coding/StationBoard/.pio/build/ESP32-2432S028R/partitions.bin public/firmware/
cp C:/Users/pasca/Coding/StationBoard/.pio/build/ESP32-2432S028R/firmware.bin public/firmware/
```

**Step 2: Create version metadata file**

Create `public/firmware/versions.json` with initial version info.

**Step 3: Commit**

```bash
git add public/firmware/
git commit -m "feat: add firmware binaries and version metadata"
```

---

## Task 5: Create Marketing Section

**Files:**
- Create: `src/components/MarketingSection.tsx`
- Modify: `src/app/page.tsx` to include below uploader

**Step 1: Create MarketingSection component**

Features to highlight:
- Hero with device image
- Feature grid (real-time departures, dual stations, 5 brightness levels, BTC ticker)
- How it works steps
- Trust indicators (Swiss-made, <1W, open source)

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add src/components/MarketingSection.tsx src/app/page.tsx
git commit -m "feat: add marketing section with features"
```

---

## Task 6: Create Version Notes Section

**Files:**
- Create: `src/components/VersionNotes.tsx`
- Create: `src/app/api/versions/route.ts` (or static fetch)

**Step 1: Create VersionNotes component**

- Fetch versions from `/firmware/versions.json`
- Display in reverse chronological order
- Each entry: version, date, 1-2 bullet points
- Download .bin link for manual flashing

**Step 2: Add to page.tsx**

**Step 3: Commit**

```bash
git add src/components/VersionNotes.tsx src/app/page.tsx
git commit -m "feat: add version notes section"
```

---

## Task 7: Style and Layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Add custom styles**

- Clean, modern design
- Responsive layout
- Progress bar animations
- Dark mode support (optional)

**Step 2: Update layout with metadata**

```typescript
export const metadata = {
  title: 'StationBoard Uploader - Flash Your ESP32',
  description: 'Web-based firmware uploader for StationBoard Swiss transport display'
}
```

**Step 3: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "style: add responsive layout and custom styles"
```

---

## Task 8: Build and Verify

**Files:**
- Run: Build command
- Test: Manual verification

**Step 1: Build static export**

```bash
npm run build
```

**Step 2: Verify dist folder contents**

- Check dist/index.html exists
- Check dist/firmware/ contains binaries
- Check all JS/CSS properly linked

**Step 3: Commit (if any changes)**

---

## Task 9: Deploy to Vercel

**Files:**
- Run: Vercel CLI commands

**Step 1: Install Vercel CLI if needed**

```bash
npm i -g vercel
```

**Step 2: Deploy**

```bash
vercel --prod
```

**Step 3: Share deployment URL**

---

## Notes for Implementation

### esptool-js Flashing Sequence

For ESP32-2432S028R, flash in this order:
1. bootloader.bin at 0x1000
2. partitions.bin at 0x8000
3. firmware.bin at 0x10000

### Web Serial API Requirements

- Chrome/Edge only (98+)
- Requires HTTPS or localhost
- User must grant USB permission

### File Sizes to Check

- bootloader.bin: ~17KB
- partitions.bin: ~3KB
- firmware.bin: ~1.3MB

Total: ~1.35MB download before flashing
