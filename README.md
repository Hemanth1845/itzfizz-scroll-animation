# VOLT / DRIVE — ITZFIZZ // Scroll-Driven Kinetic Systems

An original, high-performance scroll-driven automotive digital experience built for the **Itzfizz Digital Web Development Internship** evaluation. 

The project reimagines the assignment's core requirements—a scroll-controlled vehicle, dynamic illuminated road trail, progressive headline reveals, and four synchronized impact metrics—into an art-directed, cinematic experience engineered with **React 19**, **GSAP ScrollTrigger**, and **Tailwind CSS**.

---

## Overview

Rather than replicating the plain horizontal gray layout of the assignment's barebones reference, **VOLT / DRIVE** establishes an art-directed cyber-automotive visual language. 

The scene is composed around an organic, S-shaped curving highway cutting across deep midnight navy terrain (`#050811`). As the user scrolls, a custom top-down silver-blue sports car travels along the mathematical path coordinates, illuminating the road with an electric cyan and acid-lime neon trail. The journey transitions through four narrative milestones:
1. **01 IDLE**: Initial hero view, displaying `WHERE IDEAS MOVE`, brand lockup, and engagement prompt.
2. **02 IGNITION**: Vehicle accelerates along the curve, revealing `MOVE WITH INTENT` and dynamic speedometer velocity readout.
3. **03 MOMENTUM**: Vehicle banks through the valley curve, revealing `DATA DRIVES PROGRESS` and four glassmorphic metric cards (+58%, +27%, -23%, -40%) with live counting numbers.
4. **04 ARRIVAL**: Vehicle finishes at the illuminated finish portal, revealing `BUILT FOR WHAT'S NEXT`, 100% stage completion, and call to action.

Scrolling backward naturally scrubs the entire sequence in reverse at 60 FPS.

---

## Features

- **Mathematical Motion Path Following**: Computes SVG Bezier coordinates `(x, y)` and lookahead tangent angles dynamically using `path.getPointAtLength()`, keeping the vehicle oriented smoothly along non-linear curves without sudden jumps or clipping.
- **Scrubbed Glow Trail**: Synchronizes SVG `strokeDashoffset` to the vehicle's position in real time via ScrollTrigger scrub, generating a glowing neon electric trail along the road.
- **Four Coordinated Storyboard Stages**: Narrative transitions triggered smoothly at defined scroll progress intervals (`01 IDLE` → `02 IGNITION` → `03 MOMENTUM` → `04 ARRIVAL`).
- **Dynamic Percentage Counters**: Metric cards feature animated count-up numbers (+58% Route Efficiency, +27% Velocity Lift, -23% Friction Damping, -40% Overhead Drop) tied to scroll progress.
- **Velocity Telemetry**: Displays real-time speed calculation (`KM/H`) derived from the user's scroll velocity.
- **Accessibility & Reduced Motion**: Automatically checks `prefers-reduced-motion: reduce` and renders an accessible static layout without animation traps.
- **Zero Horizontal Overflow**: Guaranteed viewport stability across mobile, tablet, and 1440px+ desktop resolutions.
- **Clean Component Architecture**: Strict separation of concerns, zero code comments in source code, and automatic memory cleanup with `gsap.context()`.

---

## Tech Stack

- **React 19**: Component lifecycle, refs management, and declarative state orchestration.
- **Vite 8**: Modern build tooling, fast HMR, and production asset optimization.
- **GSAP 3 & ScrollTrigger**: Precision GPU-accelerated transforms, pinned timeline choreography, and scrubbed synchronization.
- **Tailwind CSS v4**: Modern CSS utilities and custom design tokens.
- **Lucide React**: Directional arrows and telemetry indicators.

---

## Storyboard & Visual Direction

The visual architecture is inspired by the provided creative storyboard:
- **Canvas**: Deep midnight navy `#050811` with topographic contour circles and atmospheric lighting.
- **Highway**: S-curve path with dark asphalt surface, illuminated cyan curbs, and center dashed lane dividers.
- **Vehicle**: Custom silver-blue futuristic sports car viewed from above with tinted cockpit canopy, aerodynamic splitters, and cyan LED light cones.
- **Accents**: Electric cyan (`#00f0ff`) and acid-lime (`#ccff00`).

---

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) and npm installed:

```bash
node -v
npm -v
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Hemanth1845/itzfizz-scroll-animation.git
cd itzfizz-scroll-animation
npm install
```

---

## Run Locally

Start the local Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build

Compile the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The compiled assets will be output to the `dist/` folder.

---

## Animation Explanation

The core scroll journey is powered by a synchronized GSAP timeline connected to ScrollTrigger:

1. **Pinned Viewport**: The `#journey` container spans `360vh` of scroll distance. The inner track container is pinned (`pin: true`) for the duration of the section.
2. **Path Geometry Calculation**:
   ```javascript
   const totalLength = path.getTotalLength()
   const currentLength = progress * totalLength
   const pt = path.getPointAtLength(currentLength)
   const nextPt = path.getPointAtLength(Math.min(currentLength + 8, totalLength))
   const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI)
   ```
3. **Scrub Synchronization**: With `scrub: 1.2`, user scroll gestures smoothly interpolate the vehicle along the road with natural inertia and reverse playback.
4. **Trail Drawing**: The trail path uses `strokeDasharray` set to `totalLength`, with `strokeDashoffset` dynamically updating as `totalLength * (1 - progress)` to trace the exact curve of the car.
5. **Memory Teardown**: All GSAP instances are scoped within `gsap.context(..., containerRef)`, guaranteeing clean teardown when unmounting without memory leaks or StrictMode duplication.

---

## Project Structure

```text
itzfizz-scroll-animation/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Pages CI/CD workflow
├── public/
│   └── assets/                  # Public assets
├── src/
│   ├── components/
│   │   ├── BrandHeader.jsx      # Top navigation and brand lockup
│   │   ├── CarModel.jsx         # Custom top-down silver-blue sports car
│   │   ├── ClosingSection.jsx   # Technical specifications and CTA
│   │   ├── Footer.jsx           # Clean footer and repository links
│   │   ├── MetricCard.jsx       # Cyber-editorial glass metric cards
│   │   └── RoadScene.jsx        # Pinned S-curve timeline orchestrator
│   ├── data/
│   │   └── metrics.js           # Sample impact statistics data
│   ├── hooks/
│   │   └── useReducedMotion.js  # Accessibility media query listener
│   ├── styles/
│   │   └── index.css            # Dark mode tokens and typography
│   ├── App.jsx                  # Main application wrapper
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template with typography imports
├── package.json                 # Dependencies and npm scripts
├── vite.config.js               # Vite bundler configuration
└── README.md                    # Project documentation
```

---

## Asset Credits

- **Vehicle Graphic**: Original custom top-down vector illustration designed specifically for this project as an inline scalable SVG inside `CarModel.jsx`.
- **Topography & Highway**: Original mathematical Bezier curves and contour SVG elements created for this project.

---

## Deployment

The project is pre-configured for automated GitHub Pages deployment using GitHub Actions.

### Deployment Instructions:
1. Push the code to the `main` branch of your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete VOLT / DRIVE kinetic scroll experience"
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, choose **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build the project and deploy it to:
   `https://hemanth1845.github.io/itzfizz-scroll-animation/`

---

## Testing & Quality Assurance

- **Build Verification**: `npm run build` completed cleanly in under 1 second with zero warnings or errors.
- **Code Style Compliance**: Verified with ripgrep that all source files (`.js`, `.jsx`, `.css`, `.html`) contain zero code comments in strict accordance with the project specification.
- **Responsive Architecture**: Tested across desktop (1440px), tablet (768px), and mobile viewports with flexible SVG viewBox scaling and zero horizontal overflow.
- **Accessibility**: Includes semantic headings, accessible `aria-label` tags, visible focus indicators, and `prefers-reduced-motion` detection.

### Unverified Checks:
- Headless automated browser testing could not be executed due to an external Playwright driver CDN restriction in the sandbox. Manual interactive verification via local dev server (`http://localhost:5173/`) or GitHub Pages is recommended.

---

## Limitations

- Telemetry velocity is derived from scroll delta speed; smooth trackpads or mice may display varying velocity spikes.
- Path coordinates are optimized for wide aspect ratios and adapt responsively down to mobile viewports through SVG viewBox scaling.
#   i t z f i z z - s c r o l l - a n i m a t i o n  
 