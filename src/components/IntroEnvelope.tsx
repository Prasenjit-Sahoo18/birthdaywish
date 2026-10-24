import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface IntroEnvelopeProps {
  onOpen: () => void;
}

export const IntroEnvelope: React.FC<IntroEnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    sounds.playEnvelopeOpen();

    // Trigger delicate, elegant sparkles
    setTimeout(() => {
      sounds.playSparkle();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D6B77A', '#F7DCE5', '#D989A6', '#FFF9F4', '#722F46'],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });
    }, 400);

    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        onOpen();
      }, 700);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#FFF5F8] via-[#FCEEF2] to-[#F7DCE5] px-4 overflow-hidden"
        >
          {/* Subtle ambient twinkling background elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2 }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  top: `${(i * 19) % 95}%`,
                  left: `${(i * 23) % 95}%`,
                }}
                className="absolute text-gold/40 text-xs select-none"
              >
                ✦
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
            {/* Header intro typography */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif italic text-burgundy-700/80 text-base md:text-lg mb-2 tracking-wide"
            >
              “Someone as special as you deserves a little magic.”
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="font-script text-3xl md:text-5xl text-burgundy-800 mb-8"
            >
              A little something, just for Neha ♡
            </motion.h1>

            {/* Interactive Envelope Graphic */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="relative w-72 sm:w-84 md:w-96 h-48 sm:h-56 bg-[#FFF9F4] rounded-2xl shadow-envelope border border-blush-300/80 p-4 flex flex-col items-center justify-between cursor-pointer group"
              onClick={handleOpen}
            >
              {/* Envelope flap */}
              <motion.div
                animate={{
                  rotateX: isOpening ? 180 : 0,
                  transformOrigin: 'top',
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute -top-0.5 left-0 right-0 h-28 bg-[#FFF2F5] border-b border-blush-300 rounded-t-2xl shadow-sm z-20 flex items-center justify-center"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              >
                {/* Wax seal */}
                <motion.div
                  animate={{
                    scale: isOpening ? [1, 1.25, 0] : 1,
                    opacity: isOpening ? [1, 1, 0] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-burgundy-800 via-burgundy-700 to-rose-deep border-2 border-gold shadow-md flex items-center justify-center transform -translate-y-2 group-hover:scale-105 transition-transform"
                >
                  <span className="font-serif font-bold text-gold text-xl tracking-tighter">N</span>
                </motion.div>
              </motion.div>

              {/* Inside paper card preview */}
              <motion.div
                animate={{
                  y: isOpening ? -35 : 0,
                  opacity: isOpening ? 1 : 0.6,
                }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-11/12 h-36 bg-white rounded-lg shadow-inner border border-blush-200 p-4 flex flex-col items-center justify-center z-10"
              >
                <div className="w-12 h-0.5 bg-gold/40 mb-2"></div>
                <p className="font-serif italic text-burgundy-900 text-sm md:text-base font-medium">
                  With All the Love in the World
                </p>
                <p className="font-script text-xl text-rose-deep mt-1">October 30</p>
                <div className="w-8 h-0.5 bg-gold/40 mt-2"></div>
              </motion.div>

              {/* Bottom fold texture */}
              <div className="w-full flex justify-between items-center text-xs text-burgundy-600/70 pt-2 z-10">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-deep fill-rose-deep/30" />
                  <span>Handcrafted</span>
                </span>
                <span className="text-gold font-serif">✦ Special Edition ✦</span>
              </div>
            </motion.div>

            {/* Open Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8"
            >
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-burgundy-800 via-burgundy-700 to-burgundy-800 text-ivory-100 font-medium text-sm md:text-base shadow-soft-glow hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-blush-200"
              >
                <Sparkles className="w-4 h-4 text-gold animate-spin" style={{ animationDuration: '6s' }} />
                <span>{isOpening ? 'Unfolding Magic...' : 'Open Your Birthday Surprise'}</span>
                <Sparkles className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xs text-burgundy-700/60 mt-4 tracking-wider uppercase"
            >
              Click envelope or button to begin
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
