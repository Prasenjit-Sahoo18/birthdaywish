import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dices, Heart, Search, X, Check } from 'lucide-react';
import { BIRTHDAY_CONTENT, BirthdayReason } from '../data/birthdayContent';
import { sounds } from '../utils/soundEffects';

export const Reasons: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [spotlightReason, setSpotlightReason] = useState<BirthdayReason | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);

  const { reasons } = BIRTHDAY_CONTENT;
  const categories = ['All', 'Kindness', 'Heart', 'Spirit', 'Grace', 'Presence'];

  const filteredReasons = reasons.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRandomReminder = () => {
    sounds.playSparkle();
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setSpotlightReason(reasons[randomIndex]);
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playSparkle();
    setFavoritedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="reasons-section" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-deep fill-rose-deep" />
          <span>Thoughtful Affirmations</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-4">
          Reasons You Are Special
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light mb-8">
          A collection of gentle truths and reminders of why your heart and presence are so deeply valued.
        </p>

        {/* Action Button: Give me a little reminder */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleRandomReminder}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-burgundy-800 via-burgundy-700 to-burgundy-800 text-ivory-100 font-medium text-sm shadow-soft-glow hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Dices className="w-4 h-4 text-gold animate-bounce" />
            <span>Give Me a Little Reminder</span>
            <Sparkles className="w-4 h-4 text-gold" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-burgundy-800 text-ivory-100 shadow-sm'
                  : 'bg-white/80 text-burgundy-700 border border-blush-200 hover:bg-blush-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-burgundy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reminders..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-white/90 border border-blush-200 text-burgundy-900 placeholder-burgundy-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReasons.map((item, index) => {
          const isFavorite = favoritedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
              onClick={() => setSpotlightReason(item)}
              className="group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-blush-200 shadow-card-soft hover:shadow-rose-glow hover:border-gold/50 cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-semibold text-rose-deep/80 tracking-wider">
                    #{String(item.id).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-blush-100 text-burgundy-700 font-medium">
                      {item.category}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="text-blush-300 hover:text-rose-deep transition-colors p-1"
                      aria-label="Save this reason"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite ? 'text-rose-deep fill-rose-deep' : 'text-blush-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-semibold text-burgundy-900 mb-2 group-hover:text-burgundy-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-burgundy-700/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-blush-100 flex items-center justify-between text-[11px] text-burgundy-500">
                <span className="italic font-serif">Gentle reminder</span>
                <span className="text-gold group-hover:translate-x-1 transition-transform">
                  ✦ Click to focus
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredReasons.length === 0 && (
        <div className="text-center py-16 bg-white/50 rounded-2xl border border-blush-200 mt-6">
          <p className="text-burgundy-700 text-sm">No reminders matching your search.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-rose-deep underline"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Spotlight Pop-up Modal for Random Reminder */}
      <AnimatePresence>
        {spotlightReason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-burgundy-950/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSpotlightReason(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FFFDFB] rounded-3xl p-8 sm:p-10 border border-gold/40 shadow-2xl text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSpotlightReason(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-burgundy-500 hover:text-burgundy-900 bg-blush-100 hover:bg-blush-200 transition-colors"
                aria-label="Close spotlight"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-blush-200 text-rose-deep flex items-center justify-center mx-auto mb-4 border border-blush-300">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blush-100 text-burgundy-700 mb-3 inline-block">
                Reason #{String(spotlightReason.id).padStart(2, '0')} • {spotlightReason.category}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-900 mb-4">
                “{spotlightReason.title}”
              </h3>

              <p className="text-burgundy-700/85 text-base sm:text-lg leading-relaxed font-light mb-8">
                {spotlightReason.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleRandomReminder}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-burgundy-800 text-ivory-100 text-xs sm:text-sm font-medium hover:bg-burgundy-700 transition-colors"
                >
                  <Dices className="w-4 h-4 text-gold" />
                  <span>Another Reminder</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSpotlightReason(null)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-blush-300 text-burgundy-800 text-xs sm:text-sm font-medium hover:bg-blush-100 transition-colors"
                >
                  <Check className="w-4 h-4 text-rose-deep" />
                  <span>I Love This</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
