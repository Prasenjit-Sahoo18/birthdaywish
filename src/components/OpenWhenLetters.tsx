import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, X, Check, Bookmark } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface OpenWhenCard {
  id: string;
  trigger: string;
  tag: string;
  waxColor: string;
  letterTitle: string;
  content: string[];
  signoff: string;
}

const OPEN_WHEN_DATA: OpenWhenCard[] = [
  {
    id: 'reminder-special',
    trigger: 'You need a reminder of how special you are',
    tag: 'Affirmation',
    waxColor: 'from-burgundy-800 to-rose-deep',
    letterTitle: 'You Are Truly Rare',
    content: [
      'Dear Neha,',
      'Never let an ordinary day fool you into thinking you aren’t making a lasting impact. Your gentle warmth, your sincere heart, and the kindness you offer without asking for anything in return are rare in this world.',
      'You are genuinely appreciated for who you are—not just what you do. Don’t ever lose that pure spark.'
    ],
    signoff: 'Always cheering for you ♡'
  },
  {
    id: 'long-day',
    trigger: 'You’ve had a long, exhausting day',
    tag: 'Comfort',
    waxColor: 'from-purple-900 to-burgundy-800',
    letterTitle: 'Breathe and Rest',
    content: [
      'Take a deep breath and let your shoulders drop.',
      'You carried so much today with patience and grace. Now it is time to put down the weight of the day and let yourself rest.',
      'Sleep with a calm, peaceful mind knowing that you did more than enough today. Tomorrow will be a fresh, softer day.'
    ],
    signoff: 'Wishing you peaceful dreams ♡'
  },
  {
    id: 'doubting-dreams',
    trigger: 'You feel unsure or doubt a dream',
    tag: 'Courage',
    waxColor: 'from-amber-800 to-gold-dark',
    letterTitle: 'Trust Your Wings',
    content: [
      'It is completely natural to have moments of hesitation, but please remember the quiet resilience inside you.',
      'You have the intelligence, the perseverance, and the heart to navigate any uncertainty. Take things one gentle step at a time.',
      'The things you quietly hope for are not out of your reach.'
    ],
    signoff: 'With unwavering faith in you ♡'
  },
  {
    id: 'instant-smile',
    trigger: 'You want an instant reason to smile',
    tag: 'Joy',
    waxColor: 'from-rose-deep to-pink-600',
    letterTitle: 'A Smile for You',
    content: [
      'Did you know that your genuine smile is one of the most radiant things anyone could witness?',
      'It has an effortless way of brightening ordinary spaces and putting everyone around you at ease.',
      'Here is your gentle reminder to smile right now, because your happiness looks stunning on you!'
    ],
    signoff: 'Keep shining brightly ♡'
  },
  {
    id: 'peace-of-mind',
    trigger: 'You need gentle peace of mind',
    tag: 'Serenity',
    waxColor: 'from-rose-900 to-burgundy-900',
    letterTitle: 'Gentle Reassurance',
    content: [
      'You don’t have to have every answer or plan figured out right this second.',
      'Life has a beautiful way of falling into place when you stay true to your values. Be gentle with yourself through every season.',
      'You are safe, you are cherished, and everything will be okay.'
    ],
    signoff: 'Sending warmth and tranquility ♡'
  }
];

export const OpenWhenLetters: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<OpenWhenCard | null>(null);
  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const handleOpenLetter = (letter: OpenWhenCard) => {
    sounds.playEnvelopeOpen();
    setTimeout(() => sounds.playSparkle(), 300);
    setActiveLetter(letter);
    if (!openedIds.includes(letter.id)) {
      setOpenedIds((prev) => [...prev, letter.id]);
    }
  };

  return (
    <section id="open-when-section" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Bookmark className="w-3.5 h-3.5 text-gold" />
          <span>Interactive Digital Keepsakes</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-4">
          “Open When...” Letters
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          A personal collection of sealed envelopes crafted for different moments in your life. Click to unseal whenever you need them.
        </p>
      </div>

      {/* Grid of Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {OPEN_WHEN_DATA.map((card, idx) => {
          const isOpened = openedIds.includes(card.id);

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => handleOpenLetter(card)}
              className="group cursor-pointer bg-gradient-to-br from-[#FFFDFB] via-[#FFF9F5] to-[#FCEDF2] p-6 rounded-3xl border border-blush-300 shadow-card-soft hover:shadow-rose-glow hover:border-gold/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Ribbon Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-blush-200/80 text-burgundy-800">
                  {card.tag}
                </span>
                {isOpened ? (
                  <span className="text-[11px] text-green-700 flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3 text-green-600" /> Opened
                  </span>
                ) : (
                  <span className="text-[11px] text-gold font-serif flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold" /> Sealed
                  </span>
                )}
              </div>

              {/* Envelope Body Illustration */}
              <div className="relative py-4 flex flex-col items-center text-center">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-tr ${card.waxColor} border-2 border-gold shadow-md flex items-center justify-center text-gold mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Mail className="w-6 h-6 text-gold" />
                </div>

                <p className="font-serif italic text-sm text-burgundy-600 mb-1">
                  Open when...
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-burgundy-900 leading-snug">
                  “{card.trigger}”
                </h3>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-blush-200/70 flex items-center justify-between text-xs text-burgundy-600">
                <span className="font-serif italic">For Neha</span>
                <span className="text-rose-deep font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Note →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Letter Unfold View */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-burgundy-950/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FFFDFB] rounded-3xl p-8 sm:p-10 border border-gold/40 shadow-2xl overflow-hidden film-grain"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveLetter(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-burgundy-500 hover:text-burgundy-900 bg-blush-100 hover:bg-blush-200 transition-colors"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Wax Seal Header */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold font-bold mb-3">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Open When: {activeLetter.trigger}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-900 mb-6 pb-3 border-b border-blush-200">
                {activeLetter.letterTitle}
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-4 text-burgundy-800 text-base sm:text-lg leading-relaxed font-light mb-8">
                {activeLetter.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Signoff */}
              <div className="pt-4 border-t border-blush-200/80 flex items-center justify-between">
                <p className="font-script text-2xl text-rose-deep">{activeLetter.signoff}</p>
                <button
                  type="button"
                  onClick={() => setActiveLetter(null)}
                  className="px-5 py-2 rounded-full bg-burgundy-800 text-ivory-100 text-xs font-medium hover:bg-burgundy-700 transition-colors"
                >
                  Keep in Heart ♡
                </button>
              </div>

              {/* Decorative Corner Heart */}
              <Heart className="w-6 h-6 text-blush-300 absolute bottom-3 left-4 -rotate-12" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
