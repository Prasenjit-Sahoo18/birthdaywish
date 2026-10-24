import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, Eye, Check } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '../data/birthdayContent';
import { sounds } from '../utils/soundEffects';

export const Letter: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [revealAll, setRevealAll] = useState(false);

  const { letter } = BIRTHDAY_CONTENT;

  const handleOpenLetter = () => {
    setIsOpened(true);
    sounds.playEnvelopeOpen();
    setTimeout(() => {
      sounds.playSparkle();
    }, 300);
  };

  const handleRevealAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealAll(true);
  };

  return (
    <section id="letter-section" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Mail className="w-3.5 h-3.5 text-rose-deep" />
          <span>Personal & Heartfelt</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-3">
          A Letter for Neha
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          A quiet pause to celebrate the kind, genuine person you are.
        </p>
      </div>

      {/* Main Letter Card */}
      <div className="relative mx-auto max-w-3xl">
        {!isOpened ? (
          /* Closed Letter Envelope View */
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={handleOpenLetter}
            className="group relative cursor-pointer bg-gradient-to-br from-[#FFFDFB] to-[#FDF4F6] rounded-3xl p-8 sm:p-12 border-2 border-blush-300/80 shadow-envelope flex flex-col items-center text-center overflow-hidden"
          >
            {/* Stamp in upper corner */}
            <div className="absolute top-6 right-6 w-16 h-20 border-2 border-dashed border-blush-400 rounded-md p-1.5 flex flex-col items-center justify-center bg-white/70 rotate-3">
              <span className="text-[10px] uppercase tracking-wider text-burgundy-600 font-bold">Oct 30</span>
              <Heart className="w-5 h-5 text-rose-deep fill-rose-deep/30 my-1" />
              <span className="text-[9px] text-burgundy-500">Pure Heart</span>
            </div>

            {/* Wax Seal Emblem */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-burgundy-800 via-burgundy-700 to-rose-deep border-2 border-gold shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="font-serif font-bold text-gold text-2xl">N</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-burgundy-900 mb-2">
              For Neha's Eyes Only
            </h3>
            <p className="text-sm sm:text-base text-burgundy-700/80 max-w-md font-light mb-6">
              Written with warmth, gratitude, and highest appreciation for who you are.
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-burgundy-800 text-ivory-100 font-medium text-sm shadow-md group-hover:bg-burgundy-700 group-hover:shadow-rose-glow transition-all"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Click to Read Your Letter</span>
            </button>
          </motion.div>
        ) : (
          /* Opened Letter / Parchment View */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative bg-[#FFFDFB] rounded-3xl p-6 sm:p-10 md:p-14 border border-blush-300 shadow-envelope film-grain overflow-hidden"
            >
              {/* Gold decorative borders */}
              <div className="absolute inset-2 border border-gold/30 rounded-2xl pointer-events-none" />

              {/* Letter Controls Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-blush-200/80 mb-8 relative z-10">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-burgundy-700 font-semibold">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>October 30 • Special Letter</span>
                </div>

                {!revealAll && (
                  <button
                    type="button"
                    onClick={handleRevealAll}
                    className="inline-flex items-center gap-1.5 text-xs text-burgundy-600 hover:text-burgundy-900 px-3 py-1.5 rounded-full bg-blush-100 hover:bg-blush-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                    title="Skip line-by-line animations and read all text immediately"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Reveal all at once</span>
                  </button>
                )}
                {revealAll && (
                  <span className="inline-flex items-center gap-1 text-xs text-burgundy-600">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>Full letter displayed</span>
                  </span>
                )}
              </div>

              {/* Letter Content */}
              <div className="relative z-10 space-y-6 text-burgundy-900 leading-relaxed font-sans text-base sm:text-lg">
                {/* Salutation */}
                <motion.p
                  initial={revealAll ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-serif text-2xl sm:text-3xl font-semibold text-burgundy-900 mb-6"
                >
                  {letter.salutation}
                </motion.p>

                {/* Paragraphs with sequential fade-in */}
                {letter.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={revealAll ? false : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: revealAll ? 0 : 0.4 + idx * 0.4,
                    }}
                    className="text-burgundy-800/90 font-light leading-relaxed"
                  >
                    {p}
                  </motion.p>
                ))}

                {/* Sign-off & Signature */}
                <motion.div
                  initial={revealAll ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: revealAll ? 0 : 0.4 + letter.paragraphs.length * 0.4,
                  }}
                  className="pt-8 border-t border-blush-200/60 mt-8"
                >
                  <p className="text-burgundy-700/80 text-sm sm:text-base mb-1 italic">
                    {letter.signoff}
                  </p>
                  <p className="font-script text-2xl sm:text-3xl text-rose-deep">
                    {letter.signature}
                  </p>
                </motion.div>
              </div>

              {/* Watermark heart */}
              <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none text-rose-deep select-none">
                <Heart className="w-40 h-40 fill-rose-deep" />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
