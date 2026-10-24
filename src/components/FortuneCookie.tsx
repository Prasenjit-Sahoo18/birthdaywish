import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Cookie } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface FortuneItem {
  id: number;
  text: string;
  subtext: string;
}

const FORTUNES: FortuneItem[] = [
  {
    id: 1,
    text: "A sweet, unexpected adventure is quietly preparing to find you this year.",
    subtext: "Pack your curiosity and get ready to smile."
  },
  {
    id: 2,
    text: "All the warmth you have selflessly poured into others is returning tenfold.",
    subtext: "Prepare to be wonderfully appreciated."
  },
  {
    id: 3,
    text: "The courage you have been quietly gathering will soon open doors you thought were locked.",
    subtext: "Trust your timing and step forward."
  },
  {
    id: 4,
    text: "This new chapter is going to be your most peaceful and deeply fulfilling one yet.",
    subtext: "Gentle days and calm evenings await."
  },
  {
    id: 5,
    text: "Someone’s day is always ten times brighter simply because you crossed their path.",
    subtext: "Never underestimate your natural spark."
  },
  {
    id: 6,
    text: "A long-held dream will begin to take tangible, exciting shape in the coming months.",
    subtext: "Keep believing in what is meant for you."
  },
  {
    id: 7,
    text: "Your genuine smile has magical properties—use it abundantly in this new age.",
    subtext: "Radiance is your permanent aesthetic."
  }
];

export const FortuneCookie: React.FC = () => {
  const [isCracked, setIsCracked] = useState(false);
  const [currentFortune, setCurrentFortune] = useState<FortuneItem>(FORTUNES[0]);

  const crackCookie = () => {
    sounds.playCandleBlow();

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#D6B77A', '#F7DCE5', '#D989A6', '#FFFDFB'],
      gravity: 0.85,
    });

    setTimeout(() => {
      sounds.playSparkle();
      const randomIndex = Math.floor(Math.random() * FORTUNES.length);
      setCurrentFortune(FORTUNES[randomIndex]);
      setIsCracked(true);
    }, 250);
  };

  const resetCookie = () => {
    sounds.playSparkle();
    setIsCracked(false);
  };

  return (
    <section id="fortune-section" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Cookie className="w-3.5 h-3.5 text-gold" />
          <span>Birthday Good Luck</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-3">
          The Golden Fortune
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          Crack open the birthday fortune to see what delightful blessings the universe has lined up for you.
        </p>
      </div>

      {/* Interactive Cookie Canvas Box */}
      <div className="flex flex-col items-center">
        <div className="relative w-72 sm:w-84 h-56 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            {!isCracked ? (
              /* Closed Whole Cookie */
              <motion.div
                key="closed"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.15, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={crackCookie}
                className="group cursor-pointer relative flex flex-col items-center justify-center p-6"
              >
                {/* 3D Golden Fortune Cookie Shape */}
                <div className="relative w-40 h-28 bg-gradient-to-tr from-amber-600 via-gold to-amber-300 rounded-[50px] shadow-2xl border-2 border-white/70 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden">
                  {/* Crease line in the middle */}
                  <div className="w-1.5 h-full bg-amber-800/40 blur-[1px]"></div>
                  {/* Subtle shine */}
                  <div className="absolute top-2 left-6 w-10 h-6 bg-white/40 rounded-full blur-[2px]"></div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-serif italic text-burgundy-700 group-hover:text-rose-deep transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Tap to crack open</span>
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                </div>
              </motion.div>
            ) : (
              /* Cracked Cookie & Floating Silk Fortune Slip */
              <motion.div
                key="cracked"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative max-w-md w-full bg-gradient-to-r from-[#FFFDFB] via-white to-[#FDF4F8] p-6 sm:p-8 rounded-3xl border border-gold/50 shadow-soft-glow text-center film-grain"
              >
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold mx-auto mb-3">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>

                <p className="font-serif italic text-lg sm:text-xl text-burgundy-900 font-semibold mb-2 leading-relaxed">
                  “{currentFortune.text}”
                </p>

                <p className="text-xs text-burgundy-600/80 font-light mb-4">
                  ✦ {currentFortune.subtext}
                </p>

                <div className="pt-3 border-t border-blush-200 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={resetCookie}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-burgundy-800 text-ivory-100 text-xs font-medium hover:bg-burgundy-700 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3 text-gold" />
                    <span>Crack Another</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        {!isCracked && (
          <button
            type="button"
            onClick={crackCookie}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-burgundy-800 text-ivory-100 font-medium text-sm shadow-card-soft hover:bg-burgundy-700 hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Crack Open Your Birthday Fortune</span>
          </button>
        )}
      </div>
    </section>
  );
};
