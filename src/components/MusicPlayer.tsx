import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Repeat,
} from 'lucide-react';
import { BIRTHDAY_CONTENT } from '../data/birthdayContent';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const { music } = BIRTHDAY_CONTENT;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loop, setLoop] = useState(true);

  // Initialize and attach events to audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = loop;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [loop, volume]);

  // When autoPlayTrigger becomes true (user opened envelope), start playing
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Autoplay prevented or audio loading:', err);
          });
      }
    }
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Audio play error:', err);
        });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audio.muted = nextMute;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = val;
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = seekTime;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      {/* Hidden Native Audio Element with multiple format sources */}
      <audio ref={audioRef} preload="auto">
        <source src={music.audioSrc} type="audio/mpeg" />
        <source src={music.audioSrcM4a} type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Bottom-Right Player Bar */}
      <div className="fixed bottom-4 right-4 z-40 max-w-[95vw] sm:max-w-sm">
        <motion.div
          layout
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl border border-blush-300 shadow-envelope overflow-hidden text-burgundy-900"
        >
          {/* Main Mini Player Row */}
          <div className="flex items-center justify-between p-3 gap-3">
            {/* Spinning Vinyl & Info */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              {/* Vinyl Disc */}
              <div
                className={`relative w-11 h-11 rounded-full bg-burgundy-950 border-2 border-gold shadow-md flex items-center justify-center transition-transform ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3.5s' }}
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-gold via-gold-light to-gold flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-burgundy-950"></div>
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-xs sm:text-sm text-burgundy-900 line-clamp-1">
                    {music.title}
                  </span>
                  {isPlaying && (
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-0.5 h-full bg-rose-deep animate-pulse"></span>
                      <span className="w-0.5 h-2/3 bg-gold animate-pulse delay-75"></span>
                      <span className="w-0.5 h-4/5 bg-rose-deep animate-pulse delay-150"></span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-burgundy-600/80 font-medium">{music.artist}</p>
              </div>
            </div>

            {/* Play/Pause & Expand */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-burgundy-800 hover:bg-burgundy-700 text-ivory-100 flex items-center justify-center transition-all hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-burgundy-600 hover:text-burgundy-900 rounded-full hover:bg-blush-100 transition-colors"
                aria-label={isExpanded ? 'Collapse controls' : 'Expand controls'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Progress Bar (Visible even when collapsed for glanceability) */}
          <div className="w-full h-1 bg-blush-100 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-deep to-gold transition-all duration-200"
              style={{
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
          </div>

          {/* Expanded Drawer Controls */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 pt-3 border-t border-blush-200/60"
              >
                {/* Seek Bar */}
                <div className="mb-3">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-blush-200 rounded-lg appearance-none cursor-pointer accent-burgundy-800"
                  />
                  <div className="flex justify-between text-[10px] text-burgundy-600/80 mt-1 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Volume & Loop */}
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="text-burgundy-700 hover:text-burgundy-900"
                      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-deep" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-blush-200 rounded-lg appearance-none cursor-pointer accent-burgundy-800"
                      aria-label="Volume slider"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setLoop(!loop)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
                      loop
                        ? 'bg-blush-200 text-burgundy-900 font-semibold'
                        : 'text-burgundy-500 hover:text-burgundy-800'
                    }`}
                    title={loop ? 'Looping enabled' : 'Looping disabled'}
                  >
                    <Repeat className="w-3 h-3" />
                    <span>Loop</span>
                  </button>
                </div>

                {/* Gentle song subtitle badge */}
                <div className="mt-3 text-center pt-2 border-t border-blush-100 flex items-center justify-center gap-1 text-[11px] text-burgundy-600 italic font-serif">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>Playing Neha's birthday track</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};
