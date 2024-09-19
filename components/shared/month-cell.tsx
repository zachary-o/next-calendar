import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    month: string
  className?: string;
}

export const MonthCell: React.FC<Props> = ({ month, className }) => {
  return (
    <div className={cn("w-full px-2 py-1 text-center cursor-pointer text-sm hover:bg-blue-50")}>{month}</div>
  );
};