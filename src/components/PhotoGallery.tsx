import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_CONTENT, PhotoItem } from '../data/birthdayContent';

export const PhotoGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const photos = BIRTHDAY_CONTENT.photos;

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = '';
  }, []);

  const nextPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  // Keyboard navigation for lightbox
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
          <span>Moments of Grace</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-900 mb-4">
          An Editorial Gallery
        </h2>
        <p className="text-burgundy-700/80 text-sm sm:text-base font-light">
          Celebrating the grace, brightness, and warmth you bring everywhere you go.
        </p>
      </div>

      {/* Asymmetrical Editorial Scrapbook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {photos.map((photo: PhotoItem, index: number) => {
          // Asymmetrical layout styling
          const spanClass =
            index === 0
              ? 'md:col-span-5 md:mt-4'
              : index === 1
              ? 'md:col-span-7'
              : 'md:col-span-12 md:max-w-2xl md:mx-auto';

          const rotation = index === 0 ? '-rotate-1' : index === 1 ? 'rotate-1' : 'rotate-0';

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`${spanClass} ${rotation} transition-transform duration-300 hover:rotate-0`}
            >
              <div
                onClick={() => openLightbox(index)}
                className="group relative bg-white p-3.5 sm:p-4 rounded-3xl shadow-card-soft border border-blush-200 hover:border-gold/50 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-rose-glow"
              >
                {/* Visual decorative tape on top corner */}
                <div className="absolute top-2 left-6 w-12 h-4 bg-gold/25 backdrop-blur-sm -rotate-6 rounded-sm z-20 pointer-events-none" />

                {/* Image container */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-ivory-300 film-grain">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Soft gradient bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />

                  {/* Hover icon indicator */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-burgundy-800 shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Editorial Caption Area */}
                <div className="pt-4 pb-2 px-1 text-center">
                  <p className="font-serif italic text-base sm:text-lg text-burgundy-900 font-medium">
                    “{photo.caption}”
                  </p>
                  <p className="text-xs text-burgundy-600/70 mt-1 font-light tracking-wide">
                    {photo.subtext}
                  </p>
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
                  {selectedPhotoIndex + 1} of {photos.length}
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
              {/* Prev Button */}
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-1 sm:left-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Active Image */}
              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="relative max-h-[75vh] max-w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20"
              >
                <img
                  src={photos[selectedPhotoIndex].src}
                  alt={photos[selectedPhotoIndex].alt}
                  className="max-h-[75vh] w-auto object-contain rounded-2xl"
                />
              </motion.div>

              {/* Next Button */}
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
                “{photos[selectedPhotoIndex].caption}”
              </p>
              <p className="text-xs text-blush-200 mt-0.5">
                {photos[selectedPhotoIndex].subtext}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
