import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Heart, RotateCcw } from 'lucide-react';
import { BIRTHDAY_CONTENT, PhotoItem } from '../data/birthdayContent';
import { sounds } from '../utils/soundEffects';

interface PhotoWithBackNote extends PhotoItem {
  backNote: string;
  stampText: string;
}

const EXTENDED_PHOTOS: PhotoWithBackNote[] = [
  {
    ...BIRTHDAY_CONTENT.photos[0],
    backNote: "When you smile genuinely, the kindness in your eyes is undeniable. It makes ordinary moments feel softer and much warmer. Never lose that gentle spark.",
    stampText: "Oct 30 • Purest Smile"
  },
  {
    ...BIRTHDAY_CONTENT.photos[1],
    backNote: "Unapologetically joyful, full of life, and spreading cheer wherever you walk. Your authentic energy is rare and beautiful.",
    stampText: "Oct 30 • Effortless Grace"
  },
  {
    ...BIRTHDAY_CONTENT.photos[2],
    backNote: "Poised, graceful, and stunning both inside and out. A quiet, timeless reminder of how cherished and lovely you truly are.",
    stampText: "Oct 30 • Poise & Warmth"
  }
];

export const PhotoGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const openLightbox = (index: number) => {
    sounds.playSparkle();
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = '';
  }, []);

  const nextPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % EXTENDED_PHOTOS.length : null));
  }, []);

  const prevPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + EXTENDED_PHOTOS.length) % EXTENDED_PHOTOS.length : null));
  }, []);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playSparkle();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, closeLightbox, nextPhoto, prevPhoto]);

  return (
    <section id="gallery-section" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blush-100 border border-blush-300 text-burgundy-700 text-xs tracking-widest uppercase font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Interactive Scrapbook</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-4">
          An Editorial Gallery
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          Tap each Polaroid to view in high resolution, or click <strong className="text-burgundy-900">“Flip Card”</strong> to read the handwritten note on the back.
        </p>
      </div>

      {/* Asymmetrical Editorial Scrapbook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {EXTENDED_PHOTOS.map((photo, index) => {
          const spanClass =
            index === 0
              ? 'md:col-span-5 md:mt-4'
              : index === 1
              ? 'md:col-span-7'
              : 'md:col-span-12 md:max-w-2xl md:mx-auto';

          const rotation = index === 0 ? '-rotate-1' : index === 1 ? 'rotate-1' : 'rotate-0';
          const isFlipped = !!flippedCards[photo.id];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`${spanClass} ${rotation} transition-transform duration-300 hover:rotate-0`}
            >
              <div className="relative bg-white p-4 sm:p-5 rounded-3xl shadow-card-soft border border-blush-200 hover:border-gold/50 overflow-hidden transition-all duration-300 hover:shadow-rose-glow">
                {/* Visual decorative washi tape on top corner */}
                <div className="absolute top-2 left-6 w-14 h-4 bg-gold/30 backdrop-blur-sm -rotate-6 rounded-sm z-20 pointer-events-none" />

                {/* Flip Card Container */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    {!isFlipped ? (
                      /* FRONT SIDE: The Photograph */
                      <motion.div
                        key="front"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => openLightbox(index)}
                        className="group relative w-full h-full bg-ivory-300 cursor-pointer film-grain"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />

                        {/* Top-right zoom hint */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-burgundy-800 shadow-md">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </motion.div>
                    ) : (
                      /* BACK SIDE: Handwritten Postcard Note */
                      <motion.div
                        key="back"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full bg-[#FFFBF6] p-6 sm:p-8 flex flex-col justify-between border border-gold/30 rounded-2xl text-burgundy-900 shadow-inner film-grain"
                      >
                        {/* Stamp Header */}
                        <div className="flex justify-between items-start pb-4 border-b border-blush-200">
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-bold">
                              POSTCARD MEMOIR
                            </span>
                            <p className="font-serif italic text-xs text-burgundy-700">
                              Especially for Neha
                            </p>
                          </div>
                          <div className="w-12 h-14 border border-dashed border-rose-deep rounded p-1 flex flex-col items-center justify-center bg-white/70">
                            <Heart className="w-4 h-4 text-rose-deep fill-rose-deep/30" />
                            <span className="text-[8px] text-burgundy-600 font-bold mt-1">Oct 30</span>
                          </div>
                        </div>

                        {/* Handwritten Note Body */}
                        <div className="my-auto py-2">
                          <p className="font-serif italic text-base sm:text-lg text-burgundy-900 leading-relaxed font-medium">
                            “{photo.backNote}”
                          </p>
                        </div>

                        {/* Stamp signature */}
                        <div className="pt-3 border-t border-blush-200 flex justify-between items-center text-xs">
                          <span className="font-script text-xl text-rose-deep">With all the love ♡</span>
                          <span className="text-[10px] font-mono text-burgundy-500">{photo.stampText}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Caption & Flip Actions */}
                <div className="pt-4 pb-1 px-1 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="text-center sm:text-left">
                    <p className="font-serif italic text-base sm:text-lg text-burgundy-900 font-semibold">
                      “{photo.caption}”
                    </p>
                    <p className="text-xs text-burgundy-600/70 font-light tracking-wide">
                      {photo.subtext}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleFlip(photo.id, e)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blush-100 hover:bg-blush-200 text-burgundy-800 text-xs font-medium transition-colors"
                      title="Flip to read note on back"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-rose-deep" />
                      <span>{isFlipped ? 'Photo' : 'Flip Note'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openLightbox(index)}
                      className="p-1.5 rounded-full bg-ivory-300 hover:bg-blush-100 text-burgundy-700 transition-colors"
                      title="View full-screen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Accessible Full-screen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo Lightbox"
            className="fixed inset-0 z-50 bg-burgundy-950/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div
              className="w-full max-w-4xl flex items-center justify-between text-ivory-100 py-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm text-blush-200">
                <Heart className="w-4 h-4 text-rose-deep fill-rose-deep" />
                <span className="font-serif">
                  {selectedPhotoIndex + 1} of {EXTENDED_PHOTOS.length}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-ivory-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Central Image View with Navigation */}
            <div
              className="relative max-w-4xl w-full flex-1 flex items-center justify-center my-auto px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-1 sm:left-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="relative max-h-[75vh] max-w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20"
              >
                <img
                  src={EXTENDED_PHOTOS[selectedPhotoIndex].src}
                  alt={EXTENDED_PHOTOS[selectedPhotoIndex].alt}
                  className="max-h-[75vh] w-auto object-contain rounded-2xl"
                />
              </motion.div>

              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-1 sm:right-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div
              className="w-full max-w-2xl text-center py-3 px-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-ivory-100 mt-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-serif italic text-base sm:text-lg text-gold">
                “{EXTENDED_PHOTOS[selectedPhotoIndex].caption}”
              </p>
              <p className="text-xs text-blush-200 mt-0.5">
                {EXTENDED_PHOTOS[selectedPhotoIndex].subtext}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
