import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, X, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface SecretNote {
  id: number;
  text: string;
  theme: string;
}

const SECRET_NOTES: SecretNote[] = [
  { id: 1, text: "Your smile has an innate ability to make anyone's bad day softer.", theme: "Warmth" },
  { id: 2, text: "You don't need grand gestures to be remembered; your quiet sincerity is unforgettable.", theme: "Presence" },
  { id: 3, text: "May life be as sweet, patient, and understanding with you as you are with others.", theme: "Blessing" },
  { id: 4, text: "You carry a rare kind of beauty—one that shines from an untainted, gentle heart.", theme: "Grace" },
  { id: 5, text: "Even on days you don't feel 100%, you are still enough, worthy, and deeply appreciated.", theme: "Comfort" },
  { id: 6, text: "Never dim your kindness to fit into a rushed world. The world needs exactly your tenderness.", theme: "Kindness" },
  { id: 7, text: "You have an elegance in how you listen and how you care for people's feelings.", theme: "Empathy" },
  { id: 8, text: "Every dream you quietly protect in your heart has a reason to be there. Believe in it.", theme: "Dreams" },
  { id: 9, text: "Your laughter is contagious in the best way possible.", theme: "Joy" },
  { id: 10, text: "You possess a peaceful aura that helps people feel grounded simply by sitting beside you.", theme: "Peace" },
  { id: 11, text: "May unexpected little joys cross your path every single week of this new age.", theme: "Happiness" },
  { id: 12, text: "There is immense strength in your softness. That is your greatest superpower.", theme: "Strength" },
  { id: 13, text: "Always remember: You are somebody's favorite reminder that good souls truly exist.", theme: "Truth" },
  { id: 14, text: "Wishing you coffee that tastes like magic, sunsets that take your breath away, and deep cozy sleep.", theme: "Little Magic" },
];

export const HappinessJar: React.FC = () => {
  const [activeNote, setActiveNote] = useState<SecretNote | null>(null);
  const [openedNotes, setOpenedNotes] = useState<number[]>([]);
  const [isOpening, setIsOpening] = useState(false);

  const drawNote = () => {
    if (isOpening) return;
    setIsOpening(true);
    sounds.playSparkle();

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#D6B77A', '#F7DCE5', '#D989A6'],
      ticks: 120,
      gravity: 0.9,
    });

    setTimeout(() => {
      // Pick a note, preferably one not opened yet
      const unread = SECRET_NOTES.filter((n) => !openedNotes.includes(n.id));
      const pool = unread.length > 0 ? unread : SECRET_NOTES;
      const pick = pool[Math.floor(Math.random() * pool.length)];

      setActiveNote(pick);
      setOpenedNotes((prev) => (prev.includes(pick.id) ? prev : [...prev, pick.id]));
      setIsOpening(false);
    }, 350);
  };

  return (
    <section id="jar-section" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Gift className="w-3.5 h-3.5 text-rose-deep" />
          <span>Interactive Wish Jar</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-3">
          The Jar of Sweet Thoughts
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          A virtual jar filled with folded origami stars. Tap to draw a warm secret note anytime you wish.
        </p>
      </div>

      {/* Jar Graphic & Interaction Container */}
      <div className="flex flex-col items-center">
        {/* The Illustrated Glass Jar */}
        <div
          onClick={drawNote}
          className="relative w-64 sm:w-72 h-80 rounded-b-[60px] rounded-t-3xl bg-gradient-to-b from-white/60 via-white/40 to-blush-100/60 backdrop-blur-md border-2 border-white/90 shadow-2xl p-6 flex flex-col items-center justify-between cursor-pointer group hover:scale-[1.02] transition-transform duration-300 overflow-hidden"
        >
          {/* Glass Jar Lid & Cork */}
          <div className="absolute -top-3 w-36 h-6 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-lg shadow-md border-b-2 border-amber-900 z-20 flex items-center justify-center">
            <span className="w-20 h-1 bg-amber-400/40 rounded-full"></span>
          </div>

          {/* Neck Ribbon */}
          <div className="absolute top-3 w-40 h-3 bg-rose-deep rounded-full shadow-sm z-20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gold"></div>
          </div>

          {/* Glass Highlight Reflection */}
          <div className="absolute top-8 left-4 w-3 h-44 bg-white/40 rounded-full blur-[1px] pointer-events-none" />

          {/* Floating Origami Stars inside */}
          <div className="relative w-full flex-1 flex flex-wrap items-center justify-around p-4 mt-4">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, (i % 2 === 0 ? 12 : -12), 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5 + (i % 3) * 0.7,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
                className={`text-lg sm:text-xl select-none ${
                  i % 3 === 0 ? 'text-gold' : i % 3 === 1 ? 'text-rose-deep' : 'text-blush-400'
                }`}
              >
                ★
              </motion.div>
            ))}
          </div>

          {/* Jar Label Card */}
          <div className="relative z-10 w-11/12 bg-white/90 rounded-2xl py-2 px-3 border border-blush-200 shadow-sm text-center">
            <p className="font-serif italic text-xs text-burgundy-900 font-semibold">
              For Neha's Happiness ♡
            </p>
            <p className="text-[10px] text-burgundy-600 mt-0.5">Tap jar to draw a note</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={drawNote}
            disabled={isOpening}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-burgundy-800 text-ivory-100 font-medium text-sm shadow-card-soft hover:bg-burgundy-700 hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Draw a Secret Note</span>
            <Sparkles className="w-4 h-4 text-gold" />
          </button>

          <span className="text-xs text-burgundy-600 font-mono">
            {openedNotes.length} of {SECRET_NOTES.length} notes revealed
          </span>
        </div>
      </div>

      {/* Secret Note Modal Display */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-burgundy-950/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#FFFDFB] rounded-3xl p-8 border-2 border-gold/50 shadow-2xl text-center film-grain overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveNote(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-burgundy-500 hover:text-burgundy-900 bg-blush-100 hover:bg-blush-200 transition-colors"
                aria-label="Close note"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto mb-4 border border-gold/40">
                <Heart className="w-6 h-6 text-rose-deep fill-rose-deep/30" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-blush-100 text-burgundy-700 mb-4">
                ★ {activeNote.theme}
              </span>

              <p className="font-serif italic text-xl sm:text-2xl text-burgundy-900 leading-relaxed mb-6">
                “{activeNote.text}”
              </p>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={drawNote}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-800 text-ivory-100 text-xs font-medium hover:bg-burgundy-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-gold" />
                  <span>Draw Another Note</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
