import React, { useState, useEffect } from 'react';
import { Sparkles, Gift } from 'lucide-react';

interface CountdownState {
  isBirthdayToday: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownState>({
    isBirthdayToday: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): CountdownState => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0-indexed: 9 is October
      const currentDate = now.getDate();

      // Check if today is October 30
      if (currentMonth === 9 && currentDate === 30) {
        return {
          isBirthdayToday: true,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      // Target October 30 of current year or next year
      let targetDate = new Date(currentYear, 9, 30, 0, 0, 0, 0);
      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(currentYear + 1, 9, 30, 0, 0, 0, 0);
      }

      const diff = Math.max(0, targetDate.getTime() - now.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return {
        isBirthdayToday: false,
        days,
        hours,
        minutes,
        seconds,
      };
    };

    setCountdown(calculateTimeLeft());
    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (countdown.isBirthdayToday) {
    return (
      <div className="relative inline-flex flex-col sm:flex-row items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-900 border border-gold/50 shadow-rose-glow text-ivory-100 max-w-xl mx-auto">
        <div className="p-2 rounded-full bg-gold/20 text-gold animate-bounce">
          <Gift className="w-6 h-6" />
        </div>
        <div className="text-center sm:text-left">
          <p className="font-serif text-lg md:text-xl font-semibold text-gold">
            🎉 Today is Neha's Special Day!
          </p>
          <p className="text-xs md:text-sm text-blush-200">
            Happy Birthday, Neha! Wishing you the happiest and most beautiful day!
          </p>
        </div>
      </div>
    );
  }

  const timeBlocks = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Mins', value: countdown.minutes },
    { label: 'Secs', value: countdown.seconds },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush-100 border border-blush-300/80 text-burgundy-700 text-xs font-medium uppercase tracking-widest mb-3">
        <Sparkles className="w-3.5 h-3.5 text-gold" />
        <span>Countdown to Her Special Day</span>
        <Sparkles className="w-3.5 h-3.5 text-gold" />
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md w-full">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl bg-white/80 backdrop-blur-md border border-blush-200/90 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-800 tabular-nums">
              {String(block.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-burgundy-600/80 font-medium mt-0.5">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
