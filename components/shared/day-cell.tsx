"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  day?: number;
  currentDate?: Date;
  currentMonth?: number;
  currentYear?: number;
  dayOfWeek?: string;
  className?: string;
}

export const DayCell: React.FC<Props> = ({
  day,
  currentDate,
  currentMonth,
  currentYear,
  dayOfWeek,
}) => {

  const isToday =
    currentDate &&
    day! === currentDate.getDate() &&
    currentMonth === currentDate.getMonth() &&
    currentYear === currentDate.getFullYear();



  return (
    <div
      className={cn(
        "h-36 flex flex-col border border-gray-500 cursor-pointer hover:bg-blue-50",
        {
          "bg-green-100": isToday,
        }
      )}
    >
      <div className="w-full p-2 flex flex-row items-center justify-between">
        <span
          className={cn("text-sm font-bold", {
            "text-black": isToday,
            "text-gray-500": !isToday,
          })}
        >
          {day}
        </span>
        <span
          className={cn("text-sm font-bold", {
            "text-black": isToday,
            "text-gray-500": !isToday,
          })}
        >
          {dayOfWeek}
        </span>
      </div>
    </div>
  );
};
