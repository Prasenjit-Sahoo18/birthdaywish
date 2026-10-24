import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playSparkle();
  };

  const navLinks = [
    { name: 'Gallery', href: '#gallery-section' },
    { name: 'Letter', href: '#letter-section' },
    { name: 'Open When', href: '#open-when-section' },
    { name: 'Wish Jar', href: '#jar-section' },
    { name: 'Reasons', href: '#reasons-section' },
    { name: 'Constellation', href: '#constellation-section' },
    { name: 'Wishes', href: '#wishes-section' },
    { name: 'Cake', href: '#cake-section' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-blush-200/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={onReplayIntro}
          className="flex items-center gap-2 text-left group focus:outline-none"
          title="Replay intro envelope"
        >
          <div className="w-8 h-8 rounded-full bg-blush-200 flex items-center justify-center text-rose-deep group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-rose-deep" />
          </div>
          <div>
            <span className="font-serif font-bold text-base md:text-lg text-burgundy-900 group-hover:text-burgundy-700 transition-colors">
              For Neha ♡
            </span>
            <span className="block text-[10px] text-burgundy-600/70 font-mono tracking-wider -mt-1">
              October 30
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="text-xs font-medium uppercase tracking-wider text-burgundy-800/80 hover:text-burgundy-950 transition-colors hover:underline underline-offset-8 decoration-gold"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Action: Sound FX Toggle & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {/* Subtle UI Sound toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-full text-burgundy-700 hover:text-burgundy-900 hover:bg-blush-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            title={soundEnabled ? 'Mute subtle chimes' : 'Enable subtle chimes'}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-rose-deep" />
            ) : (
              <VolumeX className="w-4 h-4 text-burgundy-400" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-burgundy-800 hover:bg-blush-100 transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-blush-200 px-6 py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="text-left text-sm font-medium py-2 text-burgundy-900 border-b border-blush-100"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
