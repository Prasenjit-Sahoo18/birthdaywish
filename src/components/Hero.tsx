import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Image as ImageIcon, Heart, Sparkles } from 'lucide-react';
import { Countdown } from './Countdown';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Background radial gradients for warm ambiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blush-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-gold/15 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Headline & Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Date pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-blush-300 shadow-sm text-burgundy-800 text-xs tracking-widest uppercase font-semibold mb-6">
            <Calendar className="w-3.5 h-3.5 text-rose-deep" />
            <span>OCTOBER 30</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            <span className="text-burgundy-600 font-serif italic capitalize">Special Day</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-burgundy-900 leading-[1.1] mb-4">
            Happy Birthday, <br />
            <span className="gold-gradient-text italic font-normal">Neha</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-burgundy-700/85 max-w-xl font-normal leading-relaxed mb-8">
            To the girl whose beautiful heart makes the world a little brighter.
          </p>

          {/* Countdown block */}
          <div className="w-full max-w-md mb-10">
            <Countdown />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => scrollTo('letter-section')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-burgundy-800 text-ivory-100 font-medium text-sm shadow-card-soft hover:bg-burgundy-700 hover:shadow-rose-glow transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <Mail className="w-4 h-4 text-gold" />
              <span>A Little Note for You</span>
            </button>

            <button
              onClick={() => scrollTo('gallery-section')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/85 text-burgundy-800 border border-blush-300 font-medium text-sm shadow-sm hover:bg-blush-50 hover:border-blush-400 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blush-400"
            >
              <ImageIcon className="w-4 h-4 text-rose-deep" />
              <span>Explore Your Gallery</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Beautifully Framed Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-72 sm:w-80 md:w-96 group">
            {/* Outer decorative ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blush-300 via-gold/30 to-rose-accent/40 blur-lg opacity-60 group-hover:opacity-85 transition-opacity duration-700" />

            {/* Arch frame container */}
            <div className="relative rounded-3xl overflow-hidden bg-ivory-100 border-2 border-white shadow-2xl film-grain">
              <img
                src="/images/neha-portrait-black.jpg"
                alt="Neha smiling with curly hair in a black outfit"
                className="w-full h-[430px] sm:h-[480px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />

              {/* Gentle gradient overlay for warm color grading */}
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating heart badge */}
              <div className="absolute top-4 right-4 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-blush-200 shadow-md flex items-center gap-1.5 animate-pulse-soft">
                <Heart className="w-3.5 h-3.5 text-rose-deep fill-rose-deep" />
                <span className="font-serif italic text-xs text-burgundy-900 font-semibold">
                  Purest Heart
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-blush-200/80 shadow-md">
                <div className="flex items-center justify-between text-xs text-burgundy-800 font-medium">
                  <span className="font-serif italic text-sm">Neha</span>
                  <span className="text-gold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> October 30
                  </span>
                </div>
                <p className="text-[11px] text-burgundy-600/80 mt-0.5 italic">
                  A smile that makes ordinary moments brighter.
                </p>
              </div>
            </div>

            {/* Little floating accent hearts outside the frame */}
            <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-white shadow-md border border-blush-200 flex items-center justify-center text-rose-deep animate-float-slow">
              <Heart className="w-5 h-5 fill-rose-deep/20" />
            </div>
            <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white shadow-md border border-gold/40 flex items-center justify-center text-gold animate-float-reverse">
              <Sparkles className="w-4 h-4 fill-gold/30" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
