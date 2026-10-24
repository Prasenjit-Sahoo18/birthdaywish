import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sun, Moon, Heart, Feather } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface AuraItem {
  id: string;
  name: string;
  title: string;
  colorGrad: string;
  glowColor: string;
  badgeBg: string;
  textColor: string;
  icon: React.ReactNode;
  oneLiner: string;
  poetry: string;
}

const AURAS: AuraItem[] = [
  {
    id: 'rose-quartz',
    name: 'Rose Quartz Warmth',
    title: 'Pure Kindness & Empathy',
    colorGrad: 'from-pink-400/40 via-rose-300/30 to-blush-200/50',
    glowColor: 'rgba(217, 137, 166, 0.45)',
    badgeBg: 'bg-blush-200 text-burgundy-900',
    textColor: 'text-rose-deep',
    icon: <Heart className="w-5 h-5 fill-current" />,
    oneLiner: 'The softness you bring into a rushed world',
    poetry: 'You have a gentle way of listening and caring without asking for applause. Your presence makes ordinary spaces feel softer, safer, and infinitely more welcoming.'
  },
  {
    id: 'champagne-sun',
    name: 'Champagne Sunlight',
    title: 'Effortless Joy & Radiance',
    colorGrad: 'from-amber-300/40 via-yellow-200/30 to-gold/30',
    glowColor: 'rgba(214, 183, 122, 0.5)',
    badgeBg: 'bg-amber-100 text-amber-950',
    textColor: 'text-gold-dark',
    icon: <Sun className="w-5 h-5" />,
    oneLiner: 'A smile that feels like warm golden hour',
    poetry: 'When you laugh and smile genuinely, it naturally lifts the mood of everyone nearby. Your joy is effortless, sincere, and unforgettable.'
  },
  {
    id: 'moonlit-velvet',
    name: 'Moonlit Velvet',
    title: 'Quiet Poise & Deep Loyalty',
    colorGrad: 'from-indigo-400/30 via-purple-300/25 to-burgundy-600/30',
    glowColor: 'rgba(114, 47, 70, 0.45)',
    badgeBg: 'bg-purple-100 text-purple-950',
    textColor: 'text-burgundy-800',
    icon: <Moon className="w-5 h-5" />,
    oneLiner: 'Grounded elegance through every season',
    poetry: 'You don’t need loud gestures to stand out. You possess a quiet emotional depth and steadfast loyalty that makes people feel truly lucky to know you.'
  },
  {
    id: 'golden-grace',
    name: 'Golden Grace',
    title: 'Authentic Soul & Inner Light',
    colorGrad: 'from-amber-200/40 via-rose-200/30 to-ivory-100/50',
    glowColor: 'rgba(232, 202, 140, 0.5)',
    badgeBg: 'bg-gold-light text-burgundy-950',
    textColor: 'text-amber-800',
    icon: <Feather className="w-5 h-5" />,
    oneLiner: 'Staying genuinely, beautifully yourself',
    poetry: 'In a world full of trends and facades, you stay wonderfully authentic. Your exterior grace is only a reflection of how pure your intentions are.'
  }
];

export const BirthdayAura: React.FC = () => {
  const [activeAura, setActiveAura] = useState<AuraItem>(AURAS[0]);

  const selectAura = (aura: AuraItem) => {
    sounds.playSparkle();
    setActiveAura(aura);
  };

  return (
    <section id="aura-section" className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Vibe & Energy Spectrum</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-3">
          Neha’s Radiant Aura
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          Tap an aura sphere to reveal the distinct energies that make her heart and presence shine.
        </p>
      </div>

      {/* Aura Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {AURAS.map((aura) => {
          const isSelected = activeAura.id === aura.id;
          return (
            <button
              key={aura.id}
              type="button"
              onClick={() => selectAura(aura)}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center transition-all duration-300 transform ${
                isSelected
                  ? 'bg-white shadow-soft-glow border-gold scale-105 ring-2 ring-gold/40'
                  : 'bg-white/70 border-blush-200 hover:bg-white hover:border-blush-300 hover:-translate-y-0.5'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-inner transition-transform ${
                  isSelected ? 'scale-110' : ''
                }`}
                style={{
                  background: isSelected
                    ? `radial-gradient(circle, ${aura.glowColor} 0%, rgba(255,255,255,0.8) 100%)`
                    : '#FAF4F6',
                }}
              >
                <span className={aura.textColor}>{aura.icon}</span>
              </div>
              <span className="font-serif text-xs sm:text-sm font-bold text-burgundy-900">
                {aura.name}
              </span>
              <span className="text-[10px] text-burgundy-600/70 mt-0.5 font-medium line-clamp-1">
                {aura.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Aura Showcase Card */}
      <div className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-blush-200 p-8 sm:p-12 shadow-card-soft overflow-hidden">
        {/* Dynamic Chromatic Aura Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${activeAura.colorGrad} opacity-50 blur-2xl pointer-events-none transition-all duration-700`}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeAura.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            {/* Visual Glowing Sphere */}
            <div className="relative flex-shrink-0">
              <div
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center shadow-2xl relative animate-float-slow"
                style={{
                  background: `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${activeAura.glowColor} 60%, rgba(114, 47, 70, 0.4) 100%)`,
                  boxShadow: `0 0 50px ${activeAura.glowColor}`,
                }}
              >
                <div className="text-white drop-shadow-md text-3xl">
                  {activeAura.icon}
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 text-center md:text-left">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${activeAura.badgeBg}`}
              >
                {activeAura.name}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-900 mb-2">
                “{activeAura.title}”
              </h3>

              <p className="font-serif italic text-base text-gold-dark font-medium mb-4">
                {activeAura.oneLiner}
              </p>

              <p className="text-burgundy-800 text-sm sm:text-base leading-relaxed font-light">
                {activeAura.poetry}
              </p>

              <div className="mt-6 pt-4 border-t border-blush-200/80 flex items-center justify-center md:justify-start gap-2 text-xs text-burgundy-600">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="font-serif italic">Purest energy • Born October 30</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
