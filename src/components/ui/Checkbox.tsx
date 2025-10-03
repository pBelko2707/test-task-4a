'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
}

export default function Checkbox({ checked, onChange, error }: CheckboxProps) {
  return (
    <div className={cn('flex items-center gap-[12px]')}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="absolute w-full h-full opacity-0 cursor-pointer m-[0]"
          id="agreement"
        />
        <div
          className={cn(
            'flex justify-center items-center border-2 border-[#606566] rounded-[4px] w-[32px] h-[32px] cursor-pointer',
            error ? 'border-[#fd5656]' : checked ? 'border-[#FDB056]' : '',
            'max-[1100px]:w-[30px] max-[1100px]:h-[30px]'
          )}
        >
          {checked && (
            <Image src="/vector.svg" alt="vector" width={20} height={15} />
          )}
        </div>
      </div>
      <label
        htmlFor="agreement"
        className="font-[400] text-[16px] leading-[110%] text-[#CDCDCD] max-w-[605px] cursor-pointer max-[1100px]:text-[12px]"
      >
        Я согласен с {''}
        <a href="#">офертой рекуррентных платежей</a>
        {''} и {''}
        <a href="#">Политикой конфиденциальности</a>
      </label>
    </div>
  );
}
