# Sukumar Pokkuluri — Software Development Engineer (SDE) Portfolio

A premium, highly interactive editorial notebook portfolio built for **Sukumar Pokkuluri** showcasing full-stack capabilities, AI integrations, and tactile web interfaces.

---

## 🎨 Design Philosophy & UX Highlights

The website is engineered to replicate a physical SDE design journal and hardware handbook, combining vintage print typography with modern mechanical interactions.

### 📐 1. CAD Blueprint Precision Cursor
* **Snappy Crosshair Pointer**: A custom precision crosshair (`+`) built on hardware-accelerated transforms (`mix-blend-difference`) that automatically inverts color over light/dark surfaces.
* **Magnetic Attraction Snapping**: When hovering near interactive elements (links, buttons, index tabs), the cursor coordinates are dynamically attracted by `38%` to the button's center, mimicking professional CAD blueprint software snaps.
* **CAD Snap Indicators**: A rotating selection square expands over the crosshair intersection when snapped to a target, providing visual feedback.

### 🔊 2. Satisfying Tactile Audio Design
* **Minecraft XP Sound Engine**: Hooked up a high-quality 8-bit Experience Orb sound to trigger on all interactive button interactions.
* **Integrated Magnetic Wrappers**: Integrated via [MagneticButton.tsx](src/components/MagneticButton.tsx), triggering spring-magnetic pull effects and chimes simultaneously.
* **Master Mute Controls**: Quickly toggle all retro audio chimes using the floating sound bar or by typing the `[ S ]` hotkey.

### 📰 3. Editorial Sketchbook Aesthetics
* **Binder Notebook Grid**: Cohesive background gridlines, paper grain textures, and handwritten Caveat signatures simulating a real pencil sketchbook.
* **Internal Sketchbook Archive**: A top-ring bound spiral notepad drawer containing archived whiteboard concept sketches, flowcharts, and technical schemas.
* **Vite-Bundled MagicBento Grid**: A custom, vintage bento grid outlining professional credentials (AI integration, offline-first caching, interface fidelity, and availability status).

---

## 🛠️ Stack & Architecture

* **Core Framework**: React 18, TypeScript, Vite
* **Animations**: GSAP (GreenSock) for opening sequences/sketchbook modals, Motion (Framer Motion) for spring physics buttons
* **Styling**: TailwindCSS & custom Vanilla CSS
* **Audio Engine**: HTML5 Audio + procedural Web Audio API background hum oscillators

---

## 🚀 Running Locally

**Prerequisites:** Node.js (v18 or higher recommended)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables** (for AI interactive features):
   Create a `.env.local` file and add your credentials:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to Vercel

The application is optimized for Vercel deployment:
```bash
npx vercel
```
Vercel will auto-detect the Vite build settings, run `npm run build`, and host the static assets (`dist/`) automatically.
