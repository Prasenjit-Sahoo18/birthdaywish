import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { BIRTHDAY_CONTENT } from '../data/birthdayContent';

export const MusicPlayer: React.FC = () => {
  const { music } = BIRTHDAY_CONTENT;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAudioAvailable, setIsAudioAvailable] = useState<boolean | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSpotifyEmbed, setShowSpotifyEmbed] = useState(false);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(music.localAudioPath);
    audioRef.current = audio;
    audio.volume = volume;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsAudioAvailable(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      // Local file not present or not supported
      setIsAudioAvailable(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [music.localAudioPath, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If local audio fails or isn't present, suggest Spotify embed
          setIsAudioAvailable(false);
          setShowSpotifyEmbed(true);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-[95vw] sm:max-w-md">
      {/* Floating Collapsible Card */}
      <motion.div
        layout
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white/95 backdrop-blur-md rounded-2xl border border-blush-300 shadow-envelope overflow-hidden text-burgundy-900"
      >
        {/* Compact Header Bar (Always visible) */}
        <div className="flex items-center justify-between p-3 gap-3">
          {/* Animated Vinyl Disc */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div
              className={`relative w-10 h-10 rounded-full bg-burgundy-950 border-2 border-gold flex items-center justify-center shadow-md transition-transform ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-gold flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-burgundy-950"></div>
              </div>
            </div>

            <div className="text-left">
              <p className="font-serif font-bold text-xs sm:text-sm text-burgundy-900 line-clamp-1 flex items-center gap-1.5">
                <span>{music.title}</span>
                {isPlaying && (
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-full bg-rose-deep animate-pulse"></span>
                    <span className="w-0.5 h-2/3 bg-gold animate-pulse delay-75"></span>
                    <span className="w-0.5 h-4/5 bg-rose-deep animate-pulse delay-150"></span>
                  </span>
                )}
              </p>
              <p className="text-[10px] text-burgundy-600/80">{music.artist}</p>
            </div>
          </div>

          {/* Quick Play/Pause & Expand Buttons */}
          <div className="flex items-center gap-1.5">
            {isAudioAvailable !== false ? (
              <button
                type="button"
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-burgundy-800 hover:bg-burgundy-700 text-ivory-100 flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label={isPlaying ? 'Pause song' : 'Play song'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSpotifyEmbed(!showSpotifyEmbed)}
                className="px-2.5 py-1 rounded-full bg-green-700 hover:bg-green-600 text-white text-[10px] font-semibold flex items-center gap-1"
                title="Play track on Spotify"
              >
                <Music2 className="w-3 h-3" />
                <span>Spotify</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-burgundy-600 hover:text-burgundy-900 rounded-full hover:bg-blush-100 transition-colors"
              aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Controls Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-4 border-t border-blush-200/60 pt-3"
            >
              {/* Local Audio Progress if available */}
              {isAudioAvailable !== false && duration > 0 && (
                <div className="mb-3">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-blush-200 rounded-lg appearance-none cursor-pointer accent-burgundy-800"
                  />
                  <div className="flex justify-between text-[10px] text-burgundy-600/80 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              {/* Volume & Mute Controls */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-burgundy-700 hover:text-burgundy-900"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
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

                <a
                  href={music.spotifyTrackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-burgundy-700 hover:text-burgundy-950 font-medium underline"
                >
                  <span>Open Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Notice when local audio file is not found */}
              {isAudioAvailable === false && (
                <div className="mt-3 p-2.5 rounded-xl bg-blush-50 border border-blush-200 text-[11px] text-burgundy-800">
                  <p className="font-medium mb-1">Background Song: Espresso</p>
                  <p className="text-burgundy-600 text-[10px] leading-relaxed">
                    To play offline, place your legal <code className="bg-white px-1 py-0.5 rounded">espresso.mp3</code> in <code className="bg-white px-1 py-0.5 rounded">public/audio/</code>, or listen below with the official Spotify player:
                  </p>
                  <button
                    onClick={() => setShowSpotifyEmbed(!showSpotifyEmbed)}
                    className="mt-2 text-xs font-semibold text-rose-deep hover:underline flex items-center gap-1"
                  >
                    <span>{showSpotifyEmbed ? 'Hide Spotify Embed' : 'Show Spotify Player'}</span>
                  </button>
                </div>
              )}

              {/* Official Spotify Track Embed */}
              {showSpotifyEmbed && (
                <div className="mt-3 rounded-xl overflow-hidden border border-blush-200 shadow-inner">
                  <iframe
                    title="Sabrina Carpenter - Espresso"
                    src={music.spotifyEmbedUrl}
                    width="100%"
                    height="80"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
