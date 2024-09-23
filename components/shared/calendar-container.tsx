"use client";

import { monthNames } from "@/constants/monthsNames";
import { daysOfWeek } from "@/constants/weekdaysNames";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { Arrow } from "./arrow";
import { CalendarPopover } from "./calendar-popover";
import { DayCell } from "./day-cell";

interface Props {
  className?: string;
}

export const CalendarContainer: React.FC<Props> = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear()
  );

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (prevYear === 11 ? prevYear + 1 : prevYear));
  };

  return (
    <>
      <header className="flex items-center justify-between py-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-5">
          <ModeToggle />
          <Button size="icon">
            <Plus />
          </Button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-between">
            <Arrow direction="left" onClick={prevMonth} />
            <span className="min-w-32 text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <Arrow direction="right" onClick={nextMonth} />
          </div>
          <CalendarPopover
            currentMonth={currentMonth}
            currentYear={currentYear}
            setCurrentMonth={setCurrentMonth}
            setCurrentYear={setCurrentYear}
          />
        </div>
      </header>
      <div className="grid grid-cols-7">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <DayCell key={index} />
        ))}
        {[...Array(daysInMonth).keys()].map((day) => {
          const dayOfWeek = daysOfWeek[(day + firstDayOfMonth) % 7];
          return (
            <DayCell
              key={day + 1}
              day={day + 1}
              dayOfWeek={dayOfWeek}
              currentDate={currentDate}
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          );
        })}
      </div>
    </>
  );
};
