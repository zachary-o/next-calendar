"use client"

import { useSetMonth } from "@/hooks"
import { Calendar } from "lucide-react"
import React, { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Arrow } from "./arrow"
import { monthNames } from "@/constants/monthsNames"
import { MonthCell } from "./month-cell"

interface Props {
  className?: string
}

const minYear = 2020
const maxYear = 2050

export const CalendarPopover: React.FC<Props> = ({ className }) => {
  const { currentMonth, currentYear } = useSetMonth()
  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth)

  const prevYear = () => {
    if (selectedYear > minYear) {
      setSelectedYear((prevYearValue) => prevYearValue - 1)
    }
  }
  const nextYear = () => {
    if (selectedYear < maxYear) {
      setSelectedYear((prevYearValue) => prevYearValue + 1)
    }
  }

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
              disabled={selectedYear <= minYear}
            />
            {selectedYear}
            <Arrow
              direction="right"
              onClick={nextYear}
              disabled={selectedYear >= maxYear}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {monthNames.map((month, index) => (
            <MonthCell key={month} month={month}  />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
