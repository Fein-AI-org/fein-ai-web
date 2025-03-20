'use client'

import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FlipTimerProps {
  endDate: Date;
}

const flipAnimation = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '-100%', opacity: 0 },
  transition: {
    duration: 0.5,
    type: 'spring',
    stiffness: 300,
    damping: 30
  }
};

const FlipCard: React.FC<{ digit: string }> = ({ digit }) => (
  <div className="relative w-10 h-16 sm:w-16 sm:h-24 bg-primary rounded-lg overflow-hidden">
    <AnimatePresence mode="popLayout">
      <motion.div
        key={digit}
        className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary-foreground"
        {...flipAnimation}
      >
        {digit}
      </motion.div>
    </AnimatePresence>
  </div>
);

export default function FlipTimer({ endDate }: FlipTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeRemaining({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <motion.div
      className="flex justify-center space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <motion.div
          key={unit}
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex space-x-1">
            <FlipCard digit={formatTime(timeRemaining[unit as keyof TimeRemaining])[0]} />
            <FlipCard digit={formatTime(timeRemaining[unit as keyof TimeRemaining])[1]} />
          </div>
          <div
            className="text-foreground text-sm uppercase mt-2"
          >
            {unit}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}