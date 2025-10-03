'use client';
import { useTimer } from '@/hooks/useTimer';
import StarIcon from '@/components/icon/StarIcon';

interface TimerProps {
  onTimerFinish: () => void;
}

export default function Timer({ onTimerFinish }: TimerProps) {
  const { formattedTime, isBlinking, hasFinished, timeLeft } = useTimer({
    initialTime: 120,
    onTimerFinish,
  });

  const [minutes, seconds] = formattedTime.split(':');

  const timerStyles = {
    color: hasFinished ? '#FFFFFF' : timeLeft <= 30 ? '#FF4E4E' : '#FFBB00',
    animation: isBlinking ? 'animate-pulse' : '',
  };

  return (
    <div
      className={`flex items-center ${timerStyles.animation} gap-[8px] py-[4px]`}
    >
      <span>
        <StarIcon color={timerStyles.color} />
      </span>
      <div
        style={{
          fontVariantNumeric: 'lining-nums proportional-nums',
          color: timerStyles.color,
        }}
        className={`font-['Raleway'] font-[700] text-[40px] leading-[110%] tracking-normal flex items-baseline gap-[6px] max-[870px]:text-[32px] max-[370px]:text-[28px]`}
      >
        <span>{minutes}</span>
        <span className="mx-1">:</span>
        <span>{seconds}</span>
      </div>
      <span>
        <StarIcon color={timerStyles.color} />
      </span>
    </div>
  );
}
