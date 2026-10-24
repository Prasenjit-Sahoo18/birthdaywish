import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Compass, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface ConstellationStar {
  id: number;
  name: string;
  trait: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
}

const STARS: ConstellationStar[] = [
  {
    id: 1,
    name: "Astra Clementia",
    trait: "The Star of Kindness",
    x: 22,
    y: 35,
    description: "A heart that never hesitates to offer gentle understanding and warmth, making everyone feel safe and valued."
  },
  {
    id: 2,
    name: "Astra Lumina",
    trait: "The Star of Radiance",
    x: 48,
    y: 18,
    description: "Effortless natural charm that shines from the inside out, turning ordinary moments into brighter memories."
  },
  {
    id: 3,
    name: "Astra Fortis",
    trait: "The Star of Resilience",
    x: 78,
    y: 38,
    description: "A calm, grounded resilience that blooms gracefully through challenges and remains dignified through every season."
  },
  {
    id: 4,
    name: "Astra Serenitas",
    trait: "The Star of Warmth",
    x: 65,
    y: 72,
    description: "An unspoken soothing energy that comforts those who cross your path, leaving a peaceful and reassuring aura."
  },
  {
    id: 5,
    name: "Astra Vera",
    trait: "The Star of Authenticity",
    x: 32,
    y: 68,
    description: "Remaining sincerely, refreshingly true to who you are without pretense—one of the rarest traits anyone can possess."
  }
];

export const Constellation: React.FC = () => {
  const [activeStar, setActiveStar] = useState<ConstellationStar | null>(STARS[1]);
  const [allLit, setAllLit] = useState(false);

  const handleStarClick = (star: ConstellationStar) => {
    sounds.playSparkle();
    setActiveStar(star);
  };

  const handleLightAll = () => {
    sounds.playSparkle();
    setAllLit(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D6B77A', '#FFFDFB', '#F7DCE5', '#D989A6'],
      ticks: 150,
    });
  };

  return (
    <section id="constellation-section" className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Compass className="w-3.5 h-3.5 text-gold" />
          <span>October 30 Celestial Map</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-3">
          Neha's Constellation of Grace
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          A map of the five shining virtues that define her purest heart. Tap each star in the night sky to explore its meaning.
        </p>
      </div>

      {/* Interactive Constellation Sky Box */}
      <div className="relative min-h-[440px] rounded-3xl bg-gradient-to-b from-[#1E0914] via-[#2A0E1C] to-[#17050E] border-2 border-gold/30 shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
        {/* Subtle background star dust */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              style={{
                top: `${(i * 19) % 95}%`,
                left: `${(i * 31) % 97}%`,
                animationDelay: `${(i % 6) * 0.5}s`,
              }}
              className="absolute text-gold text-[8px] animate-pulse"
            >
              ✦
            </div>
          ))}
        </div>

        {/* SVG Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <polyline
            points={`${STARS[0].x}%,${STARS[0].y}% ${STARS[1].x}%,${STARS[1].y}% ${STARS[2].x}%,${STARS[2].y}% ${STARS[3].x}%,${STARS[3].y}% ${STARS[4].x}%,${STARS[4].y}% ${STARS[0].x}%,${STARS[0].y}%`}
            fill="none"
            stroke="rgba(214, 183, 122, 0.45)"
            strokeWidth="1.5"
            strokeDasharray={allLit ? 'none' : '4, 4'}
            className="transition-all duration-700"
          />
        </svg>

        {/* Constellation Stars */}
        <div className="absolute inset-0 z-20">
          {STARS.map((star) => {
            const isSelected = activeStar?.id === star.id;
            return (
              <div
                key={star.id}
                style={{ top: `${star.y}%`, left: `${star.x}%` }}
                onClick={() => handleStarClick(star)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              >
                {/* Glow ring */}
                <div
                  className={`absolute -inset-3 rounded-full blur-md transition-all duration-300 ${
                    isSelected || allLit
                      ? 'bg-gold/60 scale-125'
                      : 'bg-gold/20 group-hover:bg-gold/40'
                  }`}
                />

                {/* Star center icon */}
                <div
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isSelected || allLit
                      ? 'bg-gold text-burgundy-950 scale-110 shadow-soft-glow'
                      : 'bg-burgundy-900/90 text-gold border border-gold/60 group-hover:scale-105'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </div>

                {/* Hover Label */}
                <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-ivory-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {star.trait}
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Header Tag */}
        <div className="relative z-30 flex items-center justify-between text-xs text-gold font-serif">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autumn Constellation • Oct 30</span>
          </span>
          <button
            type="button"
            onClick={handleLightAll}
            className="px-3 py-1 rounded-full bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 text-[11px] font-sans font-medium transition-colors"
          >
            {allLit ? <span className="flex items-center gap-1"><Check className="w-3 h-3 text-gold" /> Constellation Aligned</span> : '✨ Illuminate Constellation'}
          </button>
        </div>

        {/* Bottom Trait Description Card */}
        <div className="relative z-30 mt-auto pt-48 sm:pt-40">
          <AnimatePresence mode="wait">
            {activeStar && (
              <motion.div
                key={activeStar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl mx-auto bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-gold/30 text-center text-ivory-100"
              >
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-bold">
                  {activeStar.name}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-gold-light mt-0.5 mb-1.5">
                  {activeStar.trait}
                </h4>
                <p className="text-xs sm:text-sm text-blush-100 leading-relaxed font-light">
                  {activeStar.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
