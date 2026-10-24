# For Neha, With All the Love in the World ♡

A premium, handcrafted, highly interactive birthday celebration website created especially for **Neha** (Birthday: **October 30**).

> “To the girl whose beautiful heart makes the world a little brighter.”

---

## ✨ Features & Sections

1. **Cinematic Intro / Welcome Screen**
   - Full-screen blush gradient with floating rose petals and twinkling stars.
   - Interactive 3D envelope with a burgundy wax seal marked **“N”**.
   - Delicate procedural chime and sparkle particle shower on open.

2. **Editorial Hero Section**
   - Elegant headline typography in *Playfair Display* and *Cormorant Garamond*.
   - Live October 30 countdown calculating local time (with automatic festive birthday banner on October 30 itself and zero-floor protection).
   - Neha's portrait beautifully framed with soft gold glow and floating heart accents.

3. **Interactive Photo Gallery**
   - Asymmetrical scrapbook layout featuring all three photographs:
     - `neha-portrait-black.jpg` — *“A smile that makes ordinary moments brighter.”*
     - `neha-black-dress.jpg` — *“A beauty that feels effortless.”*
     - `neha-red-dress.jpg` — *“A little reminder of how lovely you are.”*
   - Accessible full-screen lightbox with keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`), touch swipe support, and close controls.

4. **A Heartfelt Letter**
   - Interactive wax envelope titled *“A Letter for Neha”*.
   - Parchment paper unfold animation with gentle sequential line-by-line reveal.
   - Accessibility skip button (*“Reveal all at once”*).
   - Editable through a single content variable in `src/data/birthdayContent.ts`.

5. **32 Thoughtful Reasons & Affirmations**
   - 32 genuine, non-repetitive, wholesome reasons celebrating her kindness, grace, smile, and presence.
   - *“Give me a little reminder”* button with random selector and spotlight modal.
   - Category filtering (Kindness, Heart, Spirit, Grace, Presence) and live search bar.

6. **Surprise Wish Generator**
   - *“Make a Birthday Wish”* button triggering soft confetti.
   - 12 poetic wishes covering peace, joy, dreams, friendship, and new adventures.
   - One-click copy with instant feedback.

7. **Mini “Birthday Magic” Canvas**
   - Interactive starry night sky canvas.
   - Tap or click anywhere to release bursts of glowing stars and floating hearts.
   - Real-time sparkle counter (*“Send a little sparkle her way”*).

8. **Birthday Cake & Candle Blowing Ritual**
   - 3-tiered animated cake with golden candles and flickering CSS flames.
   - *“Make a Wish & Blow Candles”* button that extinguishes the flames with a smoke puff, celebratory confetti shower, and reveals:
     > *“May all the beautiful things you wish for find their way to you.”*
   - Re-light candle button to repeat the wish anytime.

9. **Dedicated Music Player (Espresso - Sabrina Carpenter)**
   - Floating collapsible player with spinning vinyl disc and sound-wave visualizer.
   - User-initiated (complies with browser autoplay policies).
   - Supports local audio (`public/audio/espresso.mp3`) with volume and progress controls.
   - Graceful fallback: one-click toggle to the official Spotify player embed or track link so the experience never breaks.

10. **Finale Section**
    - Three-photo collage with memories strip.
    - *“Read Your Letter Again”* smooth scroll.
    - *“Replay Surprise”* button that re-opens the cinematic welcome envelope.
    - Signature: *“Made with care, especially for you.”*

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite 6** (lightning-fast build tool)
- **Tailwind CSS** (luxury color palette: blush pink `#F7DCE5`, warm ivory `#FFF9F4`, deep burgundy `#722F46`, muted rose `#D989A6`, champagne gold `#D6B77A`)
- **Framer Motion** (orchestrated smooth spring animations)
- **Lucide React** (featherlight elegant icons)
- **Canvas-Confetti** (lightweight celebratory confetti)
- **Web Audio API** (subtle procedural chimes without external audio dependencies)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` directory with zero TypeScript errors.

---

## 🎨 How to Customize Content

All text, letter paragraphs, photos, reasons, and music settings are cleanly centralized in:
📂 `src/data/birthdayContent.ts`

- **To edit the letter**: Update `BIRTHDAY_CONTENT.letter.paragraphs` or signature.
- **To add/edit reasons**: Modify the `BIRTHDAY_CONTENT.reasons` array.
- **To add/edit birthday wishes**: Modify `BIRTHDAY_CONTENT.wishes`.
- **To update photos**: Replace the files in `public/images/`:
  - `neha-portrait-black.jpg`
  - `neha-black-dress.jpg`
  - `neha-red-dress.jpg`

---

## 🎵 How to Configure Music Legally

The player is set up for **“Espresso” by Sabrina Carpenter**.

1. **Option A (Local Audio File)**:
   Place a legal `.mp3` file named `espresso.mp3` in the `public/audio/` directory (`public/audio/espresso.mp3`). The player will automatically detect it and enable offline playback, volume control, and progress scrubbing.
   *(Note: You must have the legal right or license to distribute any bundled audio file.)*

2. **Option B (Official Spotify Embed - Included by Default)**:
   If no local audio file is provided, the player gracefully offers the embedded official Spotify widget and a direct link to the track on Spotify. Autoplay is never forced, adhering to browser policies.

---

## 🌐 Deploying to GitHub & Netlify

### Push to a New GitHub Repository

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: For Neha birthday celebration website"

# Rename branch to main
git branch -M main

# Add your GitHub repository remote
git remote add origin https://github.com/YOUR_USERNAME/neha-birthday-gift.git

# Push to GitHub
git push -u origin main
```

### Deploy to Netlify

#### Method 1: Continuous Deployment from GitHub (Recommended)
1. Go to [Netlify](https://app.netlify.com/) and click **Add new site** > **Import an existing project**.
2. Connect your GitHub account and select your repository.
3. Netlify will automatically detect settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**!

#### Method 2: Netlify CLI
```bash
# Install Netlify CLI globally (if not installed)
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

---

## 📄 License & Notes

Designed with love and care for Neha. Private and non-commercial gift project.
