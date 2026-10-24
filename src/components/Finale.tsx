import React from 'react';
import { motion } from 'framer-motion';
import { Mail, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONTENT } from '../data/birthdayContent';
import { sounds } from '../utils/soundEffects';

interface FinaleProps {
  onReplayIntro: () => void;
}

export const Finale: React.FC<FinaleProps> = ({ onReplayIntro }) => {
  const { photos } = BIRTHDAY_CONTENT;

  const scrollToLetter = () => {
    const el = document.getElementById('letter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    sounds.playEnvelopeOpen();
    onReplayIntro();
  };

  return (
    <footer className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-transparent via-[#FBF0F4] to-[#F7DCE5] text-burgundy-900 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Top Accent Icon */}
        <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-blush-200 flex items-center justify-center text-rose-deep mb-6">
          <Heart className="w-6 h-6 fill-rose-deep/20" />
        </div>

        {/* Headings */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-burgundy-900 mb-4 tracking-tight">
          Happy Birthday, <span className="gold-gradient-text italic font-normal">Neha ♡</span>
        </h2>

        <p className="font-serif italic text-lg sm:text-2xl text-burgundy-800/90 max-w-2xl mb-12 font-medium">
          “May life always be gentle with your beautiful heart.”
        </p>

        {/* Three-Photo Collage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full mb-14">
          {photos.map((photo, index) => {
            const rot = index === 0 ? '-rotate-2' : index === 1 ? 'rotate-1' : '-rotate-1';
            return (
              <motion.div
                key={photo.id}
                whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`bg-white p-3 rounded-2xl shadow-card-soft border border-blush-200/90 ${rot}`}
              >
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-ivory-300 film-grain">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3 pb-1 text-center">
                  <p className="font-serif italic text-xs text-burgundy-800 font-medium line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            type="button"
            onClick={scrollToLetter}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-burgundy-800 text-ivory-100 font-medium text-sm shadow-card-soft hover:bg-burgundy-700 hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Mail className="w-4 h-4 text-gold" />
            <span>Read Your Letter Again</span>
          </button>

          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/90 text-burgundy-800 border border-blush-300 font-medium text-sm shadow-sm hover:bg-blush-100 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <RotateCcw className="w-4 h-4 text-rose-deep" />
            <span>Replay Surprise</span>
          </button>
        </div>

        {/* Signature Line */}
        <div className="pt-8 border-t border-blush-300/60 w-full max-w-md">
          <p className="font-serif italic text-xs sm:text-sm text-burgundy-700/80 mb-1 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Made with care, especially for you.</span>
            <Sparkles className="w-3.5 h-3.5 text-gold" />
          </p>
          <p className="text-[11px] text-burgundy-500 uppercase tracking-widest font-mono">
            October 30 • For Neha
          </p>
        </div>
      </div>
    </footer>
  );
};
