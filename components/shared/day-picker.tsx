"use client";

import { monthNames } from "@/constants/monthsNames";
import { daysOfWeek } from "@/constants/weekdaysNames";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Arrow } from "./arrow";
import { YearSelect } from "./year-select";

interface Props {
  value: string;
  daysInMonth: number | undefined;
  firstDayOfMonth: number | undefined;
  className?: string;
}

const maxYear = 2050;

export const DayPicker: React.FC<Props> = ({
  value,
  daysInMonth,
  firstDayOfMonth,
  className,
}) => {
  const [currentDay, currentMonth, currentYear] = value.split(".");
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(Number(currentDay));
  const [selectedMonth, setSelectedMonth] = useState<number>(
    Number(currentMonth)
  );
  const [selectedYear, setSelectedYear] = useState<number>(Number(currentYear));
  const [yearsArray, setYearsArray] = useState<number[]>([]);

  useEffect(() => {
    const getYearsArray = () => {
      const years = [];
      for (let year = Number(currentYear); year < maxYear; year++) {
        years.push(year);
      }
      setYearsArray(years);
    };
    getYearsArray();
  }, [currentYear]);

  console.log("selectedYear", selectedYear);

  return (
    <Popover open={showDayPicker} onOpenChange={setShowDayPicker}>
      <PopoverTrigger>
        <button
          className={cn(
            "opacity-30 hover:opacity-100 cursor-pointer flex items-center",
            className
          )}
          type="button"
        >
          <CalendarDays className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-70">
        <div>
          <div className="h-4 flex items-center justify-between">
            <Arrow
              className="h-12 w-12"
              direction="left"
              onClick={() => {}}
              disabled={false}
            />
            {monthNames[Number(currentMonth) - 1]}
            <Arrow
              className="h-12 w-12"
              direction="right"
              onClick={() => {}}
              disabled={false}
            />
            <YearSelect
              selectedYear={selectedYear}
              yearsArray={yearsArray}
              setSelectedYear={setSelectedYear}
            />
          </div>
          <div className="mt-4 grid grid-cols-7">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {[...Array(firstDayOfMonth).keys()].map((_, index) => (
              <div
                key={index}
                className="flex flex-col pointer-events-none opacity-50"
              />
            ))}
            {[...Array(daysInMonth).keys()].map((day) => (
              <div
                key={day + 1}
                className={cn(
                  "text-center hover:bg-green-400 hover:cursor-pointer",
                  {
                    "bg-violet-300": day === selectedDay + 1,
                  }
                )}
                onClick={() => setSelectedDay(day - 1)}
              >
                {day + 1}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
