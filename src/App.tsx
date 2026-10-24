import React, { useState } from 'react';
import { FloatingPetals } from './components/FloatingPetals';
import { IntroEnvelope } from './components/IntroEnvelope';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhotoGallery } from './components/PhotoGallery';
import { Letter } from './components/Letter';
import { Reasons } from './components/Reasons';
import { WishGenerator } from './components/WishGenerator';
import { BirthdayMagic } from './components/BirthdayMagic';
import { BirthdayCake } from './components/BirthdayCake';
import { Finale } from './components/Finale';
import { MusicPlayer } from './components/MusicPlayer';

export const App: React.FC = () => {
  const [introOpened, setIntroOpened] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF9F4] text-burgundy-900 relative selection:bg-blush-300 selection:text-burgundy-950 font-sans">
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
        {/* 1. Hero Section with Live Countdown & Portrait */}
        <Hero />

        {/* 2. Interactive Photo Gallery with Lightbox */}
        <PhotoGallery />

        {/* 3. A Heartfelt Letter with Typewriter Reveal */}
        <Letter />

        {/* 4. 100 Little Reasons You Are Special */}
        <Reasons />

        {/* 5. Surprise Wish Generator */}
        <WishGenerator />

        {/* 6. Mini "Birthday Magic" Interactive Canvas */}
        <BirthdayMagic />

        {/* 7. Birthday Cake with Blowout Candles & Blessing */}
        <BirthdayCake />

        {/* 8. Final Screen with Collage & Replay */}
        <Finale onReplayIntro={() => setIntroOpened(false)} />
      </main>

      {/* Dedicated Floating Music Player (Espresso - Sabrina Carpenter) */}
      <MusicPlayer autoPlayTrigger={introOpened} />
    </div>
  );
};

export default App;
