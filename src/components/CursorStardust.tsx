import React, { useEffect, useRef } from 'react';

interface StardustPoint {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
}

export const CursorStardust: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<StardustPoint[]>([]);
  const isRunningRef = useRef(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#D6B77A', '#F7DCE5', '#D989A6', '#FFFDFB', '#E8CA8C'];

    const addParticle = (x: number, y: number) => {
      // Limit total particles to keep 60fps
      if (particlesRef.current.length > 40) return;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.2;
      particlesRef.current.push({
        x,
        y,
        size: Math.random() * 3 + 1.5,
        alpha: 0.85,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        renderLoop();
      }
    };

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime > 25) { // throttle spawn
        lastTime = now;
        addParticle(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        addParticle(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const renderLoop = () => {
      if (!canvas || !ctx) {
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        // Draw tiny 4-point star sparkle
        const r = p.size;
        for (let j = 0; j < 4; j++) {
          ctx.lineTo(p.x + Math.cos((j * 90 * Math.PI) / 180) * r, p.y + Math.sin((j * 90 * Math.PI) / 180) * r);
          ctx.lineTo(p.x + Math.cos(((j * 90 + 45) * Math.PI) / 180) * (r * 0.3), p.y + Math.sin(((j * 90 + 45) * Math.PI) / 180) * (r * 0.3));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        animId = requestAnimationFrame(renderLoop);
      } else {
        isRunningRef.current = false;
      }
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
};
