'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Tariff } from '@/types/tariff';
import Image from 'next/image';
import TariffsList from '@/components/TariffsList';

export default function Home() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const [timerFinished, setTimerFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/tariffs');

        if (!response.ok) {
          throw new Error('Failed to fetch tariffs');
        }

        const data = await response.json();
        setTariffs(data);
      } catch (error) {
        console.error('Ошибка загрузки тарифов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTariffs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="">
      <Header onTimerFinish={() => setTimerFinished(true)} />
      <main className="max-[870px]:pb-[30px]">
        <div className="flex flex-col max-w-[1216px] w-[100%] max-[1300px]:p-[0_16px]">
          <h1
            className={
              'max-[870px]:m-[20px_0] max-[870px]:text-[24px] max-[370px]:text-[22px]'
            }
          >
            Выбери подходящий для себя{' '}
            <span className="text-[#FDB056]">тариф</span>
          </h1>
          {/* Основной контент */}
          <div className="flex justify-between max-[870px]:flex-col max-[870px]:items-center">
            <div className="relative mt-[52px] max-[870px]:mt-[0]">
              <Image
                src="/images/muscleman.png"
                alt="muscleman"
                priority={true}
                width={380}
                height={767}
                className={'max-[870px]:h-[250px] max-[870px]:w-[124px]'}
              />
              <div
                className="absolute bottom-[45px] w-[362px] h-[80px] bg-gradient-to-b from-[rgba(35,40,41,0)] to-[rgba(35,40,41,1)]
              max-[870px]:w-[117px] max-[870px]:h-[26px] max-[870px]:bottom-[0]"
              />
            </div>
            <div>
              <TariffsList
                tariffs={tariffs}
                selectedTariff={selectedTariff}
                onTariffSelect={setSelectedTariff}
                timerFinished={timerFinished}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[30px] rounded-[30px] border-1 border-[#484D4E] p-[20px] mt-[66px] max-[870px]:mt-[24px] max-[870px]:p-[12px] max-[870px]:gap-[10px] max-[370px]:mt-[22px] max-[370px]:p-[12px_9px_12px_10px]">
            <div className="w-fit rounded-[30px] border-1 border-[#81FE95] p-[16px_30px_18px] font-[500] text-[28px] leading-[120%] text-[#81FE95] max-[870px]:text-[18px] max-[870px]:p-[10px_18px_12px] max-[370px]:text-[16px]">
              гарантия возврата 30 дней
            </div>
            <div className="font-[400] text-[24px] leading-[130%] text-[#DCDCDC] max-[870px]:text-[14px] max-[370px]:text-[13px]">
              Мы уверены, что наш план сработает для тебя и ты увидишь видимые
              результаты уже через 4 недели! Мы даже готовы полностью вернуть
              твои деньги в течение 30 дней с момента покупки, если ты не
              получишь видимых результатов.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
