import React, { useRef, useState } from 'react';
import { FloatingPetals } from './components/FloatingPetals';
import { CursorStardust } from './components/CursorStardust';
import { IntroEnvelope } from './components/IntroEnvelope';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhotoGallery } from './components/PhotoGallery';
import { Letter } from './components/Letter';
import { OpenWhenLetters } from './components/OpenWhenLetters';
import { HappinessJar } from './components/HappinessJar';
import { BirthdayAura } from './components/BirthdayAura';
import { FortuneCookie } from './components/FortuneCookie';
import { Constellation } from './components/Constellation';
import { WishGenerator } from './components/WishGenerator';
import { BirthdayMagic } from './components/BirthdayMagic';
import { BirthdayCake } from './components/BirthdayCake';
import { Finale } from './components/Finale';
import { MusicPlayer, MusicPlayerHandle } from './components/MusicPlayer';

export const App: React.FC = () => {
  const [introOpened, setIntroOpened] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  return (
    <div className="min-h-screen bg-[#FFF9F4] text-burgundy-900 relative selection:bg-blush-300 selection:text-burgundy-950 font-sans">
      {/* Magical Golden Cursor Stardust Trail */}
      <CursorStardust />

      {/* Cinematic Intro Welcome Screen Overlay */}
      {!introOpened && (
        <IntroEnvelope
          onOpen={() => setIntroOpened(true)}
          onStartMusic={() => musicPlayerRef.current?.play()}
        />
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

        {/* 3. A Heartfelt Letter with Wax Unfold & Sequential Reveal */}
        <Letter />

        {/* 4. UNIQUE: "Open When..." Sealed Luxury Envelopes */}
        <OpenWhenLetters />

        {/* 5. UNIQUE: The Jar of Sweet Thoughts with Origami Stars */}
        <HappinessJar />

        {/* 6. UNIQUE: Neha's Radiant Aura & Energy Spectrum */}
        <BirthdayAura />

        {/* 7. UNIQUE: The Golden Birthday Fortune Cracker */}
        <FortuneCookie />

        {/* 9. UNIQUE: Neha's Constellation of Grace Celestial Map */}
        <Constellation />

        {/* 10. Surprise Wish Generator */}
        <WishGenerator />

        {/* 11. Mini "Birthday Magic" Interactive Canvas */}
        <BirthdayMagic />

        {/* 12. Birthday Cake with Blowout Candles & Blessing */}
        <BirthdayCake />

        {/* 13. Final Screen with Collage & Replay */}
        <Finale onReplayIntro={() => setIntroOpened(false)} />
      </main>

      {/* Dedicated Floating Music Player (Espresso - Sabrina Carpenter) */}
      <MusicPlayer ref={musicPlayerRef} autoPlayTrigger={introOpened} />
    </div>
  );
};

export default App;
