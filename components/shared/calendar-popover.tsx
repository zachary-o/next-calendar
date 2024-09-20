"use client"

import { monthNames } from "@/constants/monthsNames"
import { useMonthDays, useSetMonth } from "@/hooks"
import { Calendar } from "lucide-react"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Arrow } from "./arrow"
import { MonthCell } from "./month-cell"

interface Props {
  className?: string
}

const minYear = 2020
const maxYear = 2050

export const CalendarPopover: React.FC<Props> = ({ className }) => {
  const { currentMonth, currentYear ,setCurrentYear, setCurrentMonth} = useSetMonth()

  const prevYear = () => {
    if (currentYear > minYear) {
      setCurrentYear((prevYearValue) => prevYearValue - 1)
    }
  }
  
  const nextYear = () => {
    if (currentYear < maxYear) {
      setCurrentYear((prevYearValue) => prevYearValue + 1)
    }
  }

  useMonthDays(currentMonth, currentYear)

  return (
    <Popover>
      <PopoverTrigger>
        <div>
          <Calendar />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          <div className="flex items-center justify-between">
            <Arrow
              direction="left"
              onClick={prevYear}
              disabled={currentYear <= minYear}
            />
            {currentYear}
            <Arrow
              direction="right"
              onClick={nextYear}
              disabled={currentYear >= maxYear}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {monthNames.map((month, index) => (
            <MonthCell key={month} month={month} onClick={() => setCurrentMonth(index)}/>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
