import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Feather, Gem, Coffee, Heart } from 'lucide-react';

export const BirthdayAlmanac: React.FC = () => {
  const facts = [
    {
      icon: <Compass className="w-5 h-5 text-rose-deep" />,
      tag: "Cosmic Sign",
      title: "Scorpio Sun",
      description: "Intuitively perceptive, fiercely loyal to those she loves, and possessing a quiet magnetic charm that requires no pretense."
    },
    {
      icon: <Feather className="w-5 h-5 text-gold" />,
      tag: "Seasonal Essence",
      title: "Peak Autumn Radiance",
      description: "Born on October 30, right when the air turns cozy, leaves turn into golden embers, and the world adopts a softer glow."
    },
    {
      icon: <Gem className="w-5 h-5 text-rose-deep" />,
      tag: "Guiding Stones",
      title: "Pink Tourmaline & Opal",
      description: "Symbols of gentle empathy, tenderness, emotional resilience, and pure light that protects the purity of the heart."
    },
    {
      icon: <Coffee className="w-5 h-5 text-gold" />,
      tag: "Signature Energy",
      title: "Espresso & Sweet Moments",
      description: "Vibrant and uplifting—bringing a shot of warmth and happiness that turns ordinary days into something to smile about."
    }
  ];

  return (
    <section id="almanac-section" className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Container styled as a Luxury Editorial Almanac */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-[#FFFDFB] via-[#FFF9F6] to-[#FDF4F7] rounded-3xl p-8 sm:p-12 md:p-16 border-2 border-blush-300 shadow-envelope film-grain overflow-hidden"
      >
        {/* Gold double border aesthetic */}
        <div className="absolute inset-3 border border-gold/40 rounded-2xl pointer-events-none" />

        {/* Editorial Top Masthead */}
        <div className="text-center pb-8 border-b border-blush-200/90 mb-10 relative z-10">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-gold font-bold mb-2">
            <span>✦ The Birthday Edition ✦</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 tracking-tight">
            The October 30 Almanac
          </h2>

          <p className="font-serif italic text-sm sm:text-base text-burgundy-700/80 mt-2 max-w-lg mx-auto">
            “A portrait of the stars, the season, and the qualities that surround the birth of someone truly wonderful.”
          </p>
        </div>

        {/* 4 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10 mb-10">
          {facts.map((fact, idx) => (
            <motion.div
              key={fact.tag}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-blush-200/90 shadow-sm hover:shadow-card-soft transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-burgundy-600 font-bold px-2.5 py-0.5 rounded-full bg-blush-100">
                  {fact.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-blush-50 flex items-center justify-center shadow-inner">
                  {fact.icon}
                </div>
              </div>

              <h3 className="font-serif text-xl font-bold text-burgundy-900 mb-2">
                {fact.title}
              </h3>

              <p className="text-xs sm:text-sm text-burgundy-700/85 leading-relaxed font-light">
                {fact.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Vintage Stamp Seal */}
        <div className="relative z-10 pt-6 border-t border-blush-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-burgundy-700">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-deep fill-rose-deep" />
            <span className="font-serif italic text-sm">
              Certified Rare Soul • Kept with All the Love in the World
            </span>
          </div>

          <span className="font-mono text-[11px] text-gold uppercase tracking-widest">
            Volume 10.30 • Neha
          </span>
        </div>
      </motion.div>
    </section>
  );
};
