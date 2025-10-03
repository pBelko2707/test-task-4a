import { useState, useEffect } from 'react';

interface UseTimerProps {
  initialTime: number;
  onTimerFinish?: () => void;
}

export function useTimer({ initialTime, onTimerFinish }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerFinish?.();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);

      if (timeLeft <= 30) {
        setIsBlinking(true);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onTimerFinish]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return {
    timeLeft,
    isBlinking,
    formattedTime: formatTime(timeLeft),
    hasFinished: timeLeft <= 0,
  };
}
