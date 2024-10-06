"use client";

import { monthNames } from "@/constants/monthsNames";
import { Calendar } from "lucide-react";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Arrow } from "./arrow";
import { MonthCell } from "./month-cell";
import { Button } from "../ui/button";

interface Props {
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
  className?: string;
}

const minYear = 2020;
const maxYear = 2050;

export const CalendarPopover: React.FC<Props> = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [showCalendar, setShowCalendar] = useState(false);

  const prevYear = () => {
    if (selectedYear > minYear) {
      setSelectedYear((prevYearValue) => prevYearValue - 1);
    }
  };

  const nextYear = () => {
    if (selectedYear < maxYear) {
      setSelectedYear((prevYearValue) => prevYearValue + 1);
    }
  };

  const handleSetMonthAndYear = () => {
    setCurrentMonth(selectedMonth);
    setCurrentYear(selectedYear);
    setShowCalendar(false);
  };

  return (
    <Popover open={showCalendar} onOpenChange={setShowCalendar}>
      <PopoverTrigger>
        <Calendar />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          <div className="flex items-center justify-between">
            <Arrow
              direction="left"
              onClick={prevYear}
              disabled={currentYear <= minYear}
            />
            {selectedYear}
            <Arrow
              direction="right"
              onClick={nextYear}
              disabled={currentYear >= maxYear}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {monthNames.map((month, index) => (
            <MonthCell
              key={month}
              selectedMonth={selectedMonth}
              index={index}
              month={month}
              onClick={() => setSelectedMonth(index)}
            />
          ))}
        </div>
        <Button className="w-full mt-4" onClick={handleSetMonthAndYear}>
          Set
        </Button>
      </PopoverContent>
    </Popover>
  );
};
