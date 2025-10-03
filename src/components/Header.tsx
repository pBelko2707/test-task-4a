'use client';
import Timer from './Timer';

interface HeaderProps {
  onTimerFinish: () => void;
}

export default function Header({ onTimerFinish }: HeaderProps) {
  return (
    <header className="container bg-[#1D5B43] rounded-tl-[60px] rounded-tr-[60px] max-[870px]:rounded-tl-[0] max-[870px]:rounded-tr-[0]">
      <div className="flex flex-col items-center py-[8px] px-[20px]">
        <div className="font-[600] text-[24px] leading-[130%] tracking-normal text-center text-[#FFFFFF] mb-[4px] max-[870px]:text-[18px] max-[370px]:text-[14px]">
          Успейте открыть пробную неделю
        </div>
        <Timer onTimerFinish={onTimerFinish} />
      </div>
    </header>
  );
}
