'use client';

import { Tariff } from '@/types/tariff';
import { calculateDiscountPercentage, cn, formatPrice } from '@/lib/utils';

interface TariffCardProps {
  tariff: Tariff;
  isSelected: boolean;
  onSelect: () => void;
  timerFinished: boolean;
}

export default function TariffCard({
  tariff,
  isSelected,
  onSelect,
  timerFinished,
}: TariffCardProps) {
  const isBest = tariff.is_best;

  const sale = calculateDiscountPercentage(tariff.price, tariff.full_price);

  return (
    <div
      className={cn(
        'overflow-hidden relative bg-[#313637] transition-all duration-300 ease-in-out cursor-pointer',
        isSelected && [
          'border-2 border-[#81FE95]',
          'hover:scale-[1.02]',
          'shadow-lg shadow-green-500/20',
        ],
        // Стили для обычного состояния
        !isSelected && [
          'border-2 border-[#484D4E]',
          'hover:border-[#FFFFFF]',
          'hover:scale-[1.02]',
        ],
        // Стили для лучшего тарифа (но не переопределяем выбранный бордер)
        isBest && [
          isSelected ? '' : 'border-[#FDB056]', // Только если не выбран
        ],
        // Размеры и отступы
        isBest
          ? 'col-span-3 h-[190px] rounded-[34px] p-[34px_80px_30px_122px]'
          : 'h-[335px] rounded-[40px] p-[70px_18px_23px_18px]',
        'max-[1100px]:h-auto max-[1100px]:p-[20px_30px] max-[1100px]:rounded-[20px] max-[370px]:p-[20px]'
      )}
      onClick={onSelect}
    >
      <div
        className={cn(
          "absolute left-[50px] top-[0] flex font-['Gilroy'] bg-[#FD5656] p-[5px_8px] rounded-b-[8px] font-[500] text-[22px] leading-[130%] text-[#FFFFFF] transition-all duration-500",
          timerFinished ? 'opacity-0 scale-0' : 'opacity-100 scale-100',
          'max-[1100px]:text-[16px] max-[1100px]:p-[3px_6px] max-[1100px]:right-[62px] max-[1100px]:left-[inherit] max-[370px]:text-[13px]'
        )}
      >
        -{sale}%
      </div>
      {isBest && (
        <div className="absolute right-[20px] top-[10px] font-[500] text-[22px] leading-[130%] text-[#FDB056] max-[1100px]:text-[16px] max-[1100px]:right-[14px] max-[1100px]:top-[6px] max-[370px]:text-[13px]">
          хит!
        </div>
      )}
      <div
        className={cn(
          'flex gap-[40px]',
          isBest ? '' : 'flex-col',
          'max-[1100px]:[flex-direction:inherit] max-[1100px]:justify-between max-[1100px]:gap-[20px] max-[1100px]:grid max-[1100px]:grid-cols-2'
        )}
      >
        <div className="flex flex-col items-center whitespace-nowrap max-[1100px]:items-start">
          <div
            className={cn(
              'flex justify-center items-center font-[500] text-[26px] leading-[120%] text-[#FFFFFF]',
              isBest ? 'mb-[16px]' : 'mb-[30px]',
              'max-[1100px]:text-[18px] max-[1100px]:mb-[16px] max-[370px]:text-[16px] max-[370px]:mb-[12px]'
            )}
          >
            {tariff.period}
          </div>
          {/* Основная цена - меняется контент с анимацией */}
          <div>
            <div
              className={cn(
                'flex font-[600] text-[50px] leading-[100%] transition-all duration-700 max-[1100px]:text-[34px] max-[370px]:text-[30px]',
                isBest ? 'text-[#FDB056]' : 'text-[#FFFFFF] justify-center'
              )}
            >
              <span
                className={cn(
                  'transition-all duration-500 inline-block',
                  timerFinished ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                )}
              >
                {formatPrice(tariff.price)} ₽
              </span>
              <span
                className={cn(
                  'transition-all duration-500 inline-block absolute',
                  timerFinished
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-110'
                )}
              >
                {formatPrice(tariff.full_price)} ₽
              </span>
            </div>

            {/* Старая цена */}
            {!timerFinished && (
              <div
                className={cn(
                  'flex justify-end items-center font-[400] text-[24px] leading-[120%] text-[#919191] line-through decoration-2 transition-opacity duration-500',
                  'max-[1100px]:text-[16px] max-[370px]:text-[14px]'
                )}
              >
                {formatPrice(tariff.full_price)} ₽
              </div>
            )}
          </div>
        </div>

        <div
          className={cn(
            'flex font-[400] text-[16px] leading-[130%] text-[#FFFFFF] m-[10px_0px]',
            isBest ? 'items-center' : '',
            'max-[1100px]:text-[14px] max-[1100px]:items-center max-[370px]:overflow-hidden max-[370px]:overflow-ellipsis max-[370px]:line-clamp-3 max-[370px]:w-[120px] max-[370px]:whitespace-normal max-[370px]:h-[54px]'
          )}
        >
          {tariff.text}
        </div>
      </div>
    </div>
  );
}
