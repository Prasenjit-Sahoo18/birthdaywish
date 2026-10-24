import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Copy, Check, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_CONTENT, BirthdayWish } from '../data/birthdayContent';
import { sounds } from '../utils/soundEffects';

export const WishGenerator: React.FC = () => {
  const { wishes } = BIRTHDAY_CONTENT;
  const [currentWish, setCurrentWish] = useState<BirthdayWish | null>(wishes[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const handleMakeWish = () => {
    setIsSpinning(true);
    sounds.playSparkle();

    // Delicate celebratory confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#D6B77A', '#F7DCE5', '#D989A6', '#FFF9F4', '#722F46'],
      ticks: 180,
      gravity: 0.85,
      scalar: 0.85,
    });

    setTimeout(() => {
      // Pick a random wish distinct from current
      let nextIndex = Math.floor(Math.random() * wishes.length);
      if (currentWish && wishes.length > 1) {
        while (wishes[nextIndex].id === currentWish.id) {
          nextIndex = Math.floor(Math.random() * wishes.length);
        }
      }
      setCurrentWish(wishes[nextIndex]);
      setIsSpinning(false);
      setCopied(false);
    }, 250);
  };

  const handleCopy = () => {
    if (!currentWish) return;
    const shareText = `“${currentWish.text}” — Birthday Wish for Neha ♡`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    sounds.playSparkle();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="wishes-section" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Wand2 className="w-3.5 h-3.5 text-gold" />
          <span>Blessings for the Year Ahead</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-3">
          A Birthday Wish Generator
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          Tap the button below to draw a heartfelt wish sent straight to your future.
        </p>
      </div>

      {/* Generator Container */}
      <div className="flex flex-col items-center">
        {/* Wish Card */}
        <div className="w-full max-w-xl min-h-[220px] mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentWish && (
              <motion.div
                key={currentWish.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-gradient-to-br from-white via-[#FFFDFB] to-[#FDF5F8] p-8 sm:p-10 rounded-3xl border border-gold/40 shadow-card-soft text-center relative overflow-hidden"
              >
                {/* Theme pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 text-rose-deep text-xs font-semibold tracking-wider uppercase mb-4">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>Wish for {currentWish.theme}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-burgundy-900 mb-4">
                  {currentWish.title}
                </h3>

                <p className="font-serif italic text-base sm:text-xl text-burgundy-800 leading-relaxed max-w-md mx-auto mb-6">
                  “{currentWish.text}”
                </p>

                {/* Copy button */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-ivory-300 hover:bg-blush-200 text-burgundy-800 border border-blush-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                    aria-label="Copy wish to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-700 font-semibold">Wish copied to clipboard! ✨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-burgundy-500" />
                        <span>Copy this wish</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Subtle corner heart accents */}
                <Heart className="w-5 h-5 text-blush-300 absolute top-4 left-4 -rotate-12" />
                <Heart className="w-5 h-5 text-blush-300 absolute bottom-4 right-4 rotate-12" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleMakeWish}
          disabled={isSpinning}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-burgundy-800 text-ivory-100 font-medium text-base shadow-card-soft hover:bg-burgundy-700 hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <Sparkles
            className={`w-5 h-5 text-gold transition-transform duration-500 ${
              isSpinning ? 'rotate-180 scale-125' : 'group-hover:rotate-45'
            }`}
          />
          <span>Make a Birthday Wish</span>
          <Sparkles className="w-5 h-5 text-gold" />
        </button>

        <p className="text-xs text-burgundy-600/70 mt-3 font-light">
          Each press sends another blessing out into the universe for Neha
        </p>
      </div>
    </section>
  );
};
