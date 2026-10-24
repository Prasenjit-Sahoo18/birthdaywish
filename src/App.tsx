import React, { useState } from 'react';
import { FloatingPetals } from './components/FloatingPetals';
import { CursorStardust } from './components/CursorStardust';
import { IntroEnvelope } from './components/IntroEnvelope';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhotoGallery } from './components/PhotoGallery';
import { Letter } from './components/Letter';
import { OpenWhenLetters } from './components/OpenWhenLetters';
import { HappinessJar } from './components/HappinessJar';
import { Reasons } from './components/Reasons';
import { Constellation } from './components/Constellation';
import { WishGenerator } from './components/WishGenerator';
import { BirthdayMagic } from './components/BirthdayMagic';
import { BirthdayCake } from './components/BirthdayCake';
import { Finale } from './components/Finale';
import { MusicPlayer } from './components/MusicPlayer';

export const App: React.FC = () => {
  const [introOpened, setIntroOpened] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF9F4] text-burgundy-900 relative selection:bg-blush-300 selection:text-burgundy-950 font-sans">
      {/* Magical Golden Cursor Stardust Trail */}
      <CursorStardust />

      {/* Cinematic Intro Welcome Screen Overlay */}
      {!introOpened && (
        <IntroEnvelope onOpen={() => setIntroOpened(true)} />
      )}

      {/* Floating Organic Rose Petals Background */}
      <FloatingPetals />

      {/* Top Floating Glass Navigation Bar */}
      <Navbar onReplayIntro={() => setIntroOpened(false)} />

      {/* Main Experience Flow */}
      <main className="relative z-20">
        {/* 1. Hero Section with Live Countdown & Framed Portrait */}
        <Hero />

        {/* 2. Interactive Photo Gallery with 3D Flip Notes & Lightbox */}
        <PhotoGallery />

        {/* 3. A Heartfelt Letter with Wax Unfold & Typewriter Reveal */}
        <Letter />

        {/* 4. UNIQUE: "Open When..." Sealed Luxury Envelopes */}
        <OpenWhenLetters />

        {/* 5. UNIQUE: The Jar of Sweet Thoughts with Origami Stars */}
        <HappinessJar />

        {/* 6. 100 Little Reasons You Are Special Affirmations */}
        <Reasons />

        {/* 7. UNIQUE: Neha's Constellation of Grace Celestial Map */}
        <Constellation />

        {/* 8. Surprise Wish Generator */}
        <WishGenerator />

        {/* 9. Mini "Birthday Magic" Interactive Canvas */}
        <BirthdayMagic />

        {/* 10. Birthday Cake with Blowout Candles & Blessing */}
        <BirthdayCake />

        {/* 11. Final Screen with Collage & Replay */}
        <Finale onReplayIntro={() => setIntroOpened(false)} />
      </main>

      {/* Dedicated Floating Music Player (Espresso - Sabrina Carpenter) */}
      <MusicPlayer autoPlayTrigger={introOpened} />
    </div>
  );
};

export default App;
