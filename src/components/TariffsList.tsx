'use client';

import { Tariff } from '@/types/tariff';
import React, { useMemo, useState } from 'react';
import TariffCard from '@/components/TariffCard';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Checkbox from '@/components/ui/Checkbox';

interface TariffsListProps {
  tariffs: Tariff[];
  selectedTariff: string | null;
  onTariffSelect: (tariffId: string) => void;
  timerFinished: boolean;
}

export default function TariffsList({
  tariffs,
  selectedTariff,
  onTariffSelect,
  timerFinished,
}: TariffsListProps) {
  const [showError, setShowError] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const sortedTariffs = useMemo(() => {
    return [...tariffs].sort((a, b) =>
      a.is_best === b.is_best ? 0 : a.is_best ? -1 : 1
    );
  }, [tariffs]);

  const handleBuyClick = () => {
    if (!agreed) {
      setShowError(true);
      return;
    }
    alert(`Покупка тарифа: ${selectedTariff}`);
    console.log('Покупка тарифа:', selectedTariff);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setAgreed(checked);
    if (checked) {
      setShowError(false);
    }
  };

  if (!tariffs.length) return null;

  return (
    <div className="max-w-[748px]">
      {/* Сетка тарифов */}
      <div className="grid grid-cols-3 gap-[14px] max-[1100px]:flex flex-col max-[1100px]:gap-[8px] max-[370px]:gap-[6px]">
        {sortedTariffs.map((tariff, index) => (
          <TariffCard
            key={index}
            tariff={tariff}
            isSelected={selectedTariff === tariff.period}
            onSelect={() => onTariffSelect(tariff.period)}
            timerFinished={timerFinished}
          />
        ))}
      </div>
      <div className="flex gap-[8px] bg-[#2D3233] p-[18px_20px] max-w-[499px] rounded-[20px] m-[20px_0_30px_0] max-[1100px]:p-[14px_12px] max-[1100px]:max-w-[100%] max-[1100px]:m-[12px_0_24px_0] max-[370px]:m-[10px_0_16px_0]">
        <Image src="/alert.svg" alt="alert" width={24} height={26} />
        <div className="font-[400] text-[16px] leading-[130%] text-[#FFFFFF] max-[1100px]:text-[12px] m-[auto_0]">
          Следуя плану на 3 месяца и более, люди получают в 2 раза лучший
          результат, чем за 1 месяц
        </div>
      </div>
      {/* Форма покупки */}
      <div className="mb-[16px]">
        <Checkbox
          checked={agreed}
          onChange={handleCheckboxChange}
          error={showError}
        />
      </div>
      <div className="flex flex-col gap-[14px] max-[1100px]:gap-[20px] max-[370px]:gap-[10px]">
        <div className="max-w-[352px] max-[1100px]:max-w-[100%]">
          <Button
            onClick={handleBuyClick}
            className={
              'animate-blink-neon max-[1100px]:text-[18px] max-[370px]:p-[16px]'
            }
          >
            Купить
          </Button>
        </div>
        <div className="font-[400] text-[14px] leading-[120%] text-[#9B9B9B] max-[1100px]:text-[10px]">
          Нажимая кнопку «Купить», Пользователь соглашается на разовое списание
          денежных средств для получения пожизненного доступа к приложению.
          Пользователь соглашается, что данные кредитной/дебетовой карты будут
          сохранены для осуществления покупок дополнительных услуг сервиса в
          случае желания пользователя.
        </div>
      </div>
    </div>
  );
}
