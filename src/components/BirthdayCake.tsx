import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export const BirthdayCake: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    sounds.playCandleBlow();

    setTimeout(() => {
      setWishMade(true);
      sounds.playSparkle();

      // Confetti celebration
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#D6B77A', '#F7DCE5', '#D989A6', '#FFF9F4', '#722F46'],
        gravity: 0.8,
        scalar: 1,
      });
    }, 450);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
    sounds.playSparkle();
  };

  return (
    <section id="cake-section" className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Birthday Ritual</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-3">
          Make a Birthday Wish
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          Close your eyes, think of the happiest thing you want for this year, and blow out the candles.
        </p>
      </div>

      {/* Cake Container */}
      <div className="flex flex-col items-center">
        {/* Animated Cake Art */}
        <div className="relative w-72 sm:w-80 h-72 flex flex-col items-center justify-end mb-8 select-none">
          {/* Candles Row */}
          <div className="flex justify-center gap-6 sm:gap-8 mb-0.5 z-20">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Candle Flame */}
                <AnimatePresence>
                  {candlesLit ? (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [1, 1.15, 0.95, 1.05],
                        y: [0, -2, 1, 0],
                        opacity: 1,
                      }}
                      exit={{
                        scale: [1, 1.4, 0],
                        y: -8,
                        opacity: 0,
                        transition: { duration: 0.35 },
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2 + idx * 0.2,
                        ease: 'easeInOut',
                      }}
                      className="relative w-5 h-7 mb-0.5 flex items-center justify-center cursor-pointer"
                      onClick={handleBlowCandles}
                    >
                      {/* Outer flame glow */}
                      <div className="absolute inset-0 bg-gold/40 rounded-full blur-sm" />
                      {/* Flame body */}
                      <div className="w-3.5 h-5 rounded-full bg-gradient-to-t from-orange-400 via-yellow-300 to-white shadow-soft-glow" />
                    </motion.div>
                  ) : (
                    /* Smoke puff when blown out */
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                      animate={{ opacity: 0, y: -16, scale: 1.4 }}
                      transition={{ duration: 1 }}
                      className="w-2 h-4 text-burgundy-300/60 font-mono text-xs select-none"
                    >
                      ~
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-burgundy-900" />

                {/* Candle Stick */}
                <div className="w-3.5 h-14 bg-gradient-to-r from-gold via-gold-light to-gold rounded-t-sm shadow-sm border-t border-white/60 flex items-center justify-center">
                  <div className="w-0.5 h-full bg-white/40" />
                </div>
              </div>
            ))}
          </div>

          {/* Tier 1 (Top Tier) */}
          <div className="relative w-40 sm:w-44 h-14 bg-gradient-to-r from-[#FFF5F8] via-white to-[#FCEEF2] rounded-t-2xl border-t border-x border-blush-300 shadow-md flex items-center justify-center z-10">
            {/* Frosting scallops */}
            <div className="absolute -top-1 left-0 right-0 flex justify-around">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-5 h-2.5 bg-blush-200 rounded-b-full shadow-inner" />
              ))}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-burgundy-700 font-serif font-bold">
              October 30
            </div>
          </div>

          {/* Tier 2 (Middle Tier) */}
          <div className="relative w-56 sm:w-60 h-16 bg-gradient-to-r from-[#FFF2F6] via-[#FFFAF8] to-[#FCE8EE] border-t border-x border-blush-300 shadow-lg flex items-center justify-center z-10">
            {/* Delicate gold pearls */}
            <div className="absolute top-1 left-2 right-2 flex justify-between px-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold shadow-sm" />
              ))}
            </div>
            <span className="font-script text-xl sm:text-2xl text-rose-deep">Neha</span>
          </div>

          {/* Tier 3 (Bottom Tier) */}
          <div className="relative w-68 sm:w-72 h-18 bg-gradient-to-r from-[#FCECEF] via-white to-[#F7DCE5] rounded-b-xl border border-blush-300 shadow-xl flex items-center justify-center z-10">
            <div className="w-full h-1 bg-gold/40 absolute top-2" />
            <div className="flex items-center gap-1.5 text-xs text-burgundy-800 font-serif italic">
              <Heart className="w-3.5 h-3.5 text-rose-deep fill-rose-deep" />
              <span>With All the Love in the World</span>
              <Heart className="w-3.5 h-3.5 text-rose-deep fill-rose-deep" />
            </div>
          </div>

          {/* Cake Stand / Plate */}
          <div className="w-80 sm:w-88 h-4 bg-gradient-to-r from-gold-dark via-gold-light to-gold rounded-full shadow-2xl -mt-1 z-0" />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col items-center">
          {candlesLit ? (
            <button
              type="button"
              onClick={handleBlowCandles}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-burgundy-800 text-ivory-100 font-medium text-base shadow-card-soft hover:bg-burgundy-700 hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <Flame className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
              <span>Make a Wish & Blow Candles</span>
              <Sparkles className="w-5 h-5 text-gold" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-burgundy-800 border border-blush-300 font-medium text-sm shadow-sm hover:bg-blush-100 transition-all focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <RotateCcw className="w-4 h-4 text-rose-deep" />
              <span>Light Candles Again</span>
            </button>
          )}

          {/* Revealed Wish Blessing Message */}
          <AnimatePresence>
            {wishMade && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#FFFDFB] to-[#FDF4F7] border border-gold/50 shadow-soft-glow max-w-xl text-center"
              >
                <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center text-rose-deep mx-auto mb-3">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <p className="font-serif italic text-xl sm:text-2xl text-burgundy-900 font-semibold mb-2">
                  “May all the beautiful things you wish for find their way to you.”
                </p>
                <p className="text-xs sm:text-sm text-burgundy-700/80 font-light">
                  Happy Birthday to someone who truly deserves a world full of happiness.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
