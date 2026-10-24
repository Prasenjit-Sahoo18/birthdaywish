import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MagicParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  isHeart: boolean;
  rotation: number;
  rotationSpeed: number;
}

export const BirthdayMagic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sparkleCount, setSparkleCount] = useState<number>(0);
  const particlesRef = useRef<MagicParticle[]>([]);
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    // Load persisted count if any
    const saved = localStorage.getItem('neha_sparkles_count');
    if (saved) {
      setSparkleCount(parseInt(saved, 10) || 0);
    }
  }, []);

  const triggerSparkleBurst = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    sounds.playSparkle();
    setSparkleCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('neha_sparkles_count', next.toString());
      return next;
    });

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const colors = ['#D6B77A', '#F7DCE5', '#D989A6', '#FFF9F4', '#FFD1DC', '#F5E6CC'];
    const burstSize = 14;

    for (let i = 0; i < burstSize; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2, // bias upward
        size: Math.random() * 6 + 4,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHeart: i % 4 === 0,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
      });
    }

    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      requestAnimationFrame(renderLoop);
    }
  };

  const renderLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isAnimatingRef.current = false;
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      isAnimatingRef.current = false;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04; // gentle gravity
      p.alpha -= p.decay;
      p.rotation += p.rotationSpeed;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.isHeart) {
        // Draw tiny heart
        ctx.beginPath();
        const s = p.size * 0.6;
        ctx.moveTo(0, s / 4);
        ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s / 2);
        ctx.bezierCurveTo(-s / 2, s, 0, s * 1.3, 0, s * 1.6);
        ctx.bezierCurveTo(0, s * 1.3, s / 2, s, s / 2, s / 2);
        ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, s / 4);
        ctx.fill();
      } else {
        // Draw star sparkle
        ctx.beginPath();
        const r = p.size;
        for (let j = 0; j < 4; j++) {
          ctx.lineTo(Math.cos(((j * 90) * Math.PI) / 180) * r, Math.sin(((j * 90) * Math.PI) / 180) * r);
          ctx.lineTo(
            Math.cos(((j * 90 + 45) * Math.PI) / 180) * (r * 0.35),
            Math.sin(((j * 90 + 45) * Math.PI) / 180) * (r * 0.35)
          );
        }
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    if (particles.length > 0) {
      requestAnimationFrame(renderLoop);
    } else {
      isAnimatingRef.current = false;
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    triggerSparkleBurst(e.clientX, e.clientY);
  };

  // Resize canvas according to container
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      <div
        onClick={handleCanvasClick}
        className="relative min-h-[380px] rounded-3xl bg-gradient-to-b from-burgundy-950 via-burgundy-900 to-burgundy-950 border border-gold/30 shadow-2xl p-6 sm:p-10 flex flex-col items-center justify-between text-center overflow-hidden cursor-crosshair select-none group"
      >
        {/* Background static twinkling stars */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              style={{
                top: `${(i * 17) % 94}%`,
                left: `${(i * 29) % 96}%`,
                animationDelay: `${(i % 5) * 0.6}s`,
              }}
              className="absolute text-gold text-[9px] animate-pulse"
            >
              ✦
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Top Header */}
        <div className="relative z-20 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold text-xs tracking-widest uppercase font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Night Sky</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-100 mb-2">
            Send a Little Sparkle Her Way
          </h3>

          <p className="text-blush-200/90 text-xs sm:text-sm max-w-md mx-auto font-light">
            Tap anywhere across this canvas to send wishing stars and glowing hearts for Neha.
          </p>
        </div>

        {/* Center Prompt Icon */}
        <div className="relative z-20 pointer-events-none my-6">
          <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-lg group-hover:scale-110 transition-transform">
            <Sparkles className="w-7 h-7 animate-pulse text-gold" />
          </div>
        </div>

        {/* Bottom Sparkle Counter Bar */}
        <div className="relative z-20 pointer-events-none flex flex-col sm:flex-row items-center gap-3">
          <div className="px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-ivory-100 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-inner">
            <Heart className="w-4 h-4 text-rose-deep fill-rose-deep" />
            <span>Sparkles sent:</span>
            <span className="font-bold text-gold text-base tabular-nums">
              {sparkleCount}
            </span>
            <span>✨</span>
          </div>

          {sparkleCount >= 10 && (
            <span className="text-[11px] text-blush-200 italic font-serif">
              “Her sky is shining brighter with every wish”
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
