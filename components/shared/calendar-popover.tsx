"use client"

import { monthNames } from "@/constants/monthsNames"
import { useSetMonth } from "@/hooks"
import { useDaysStore } from "@/store/days"
import { Calendar } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Arrow } from "./arrow"
import { MonthCell } from "./month-cell"

interface Props {
  className?: string
}

const minYear = 2020
const maxYear = 2050

export const CalendarPopover: React.FC<Props> = ({ className }) => {
  const { currentMonth, currentYear } = useSetMonth()
  const setDays = useDaysStore((state) => state.setDays)
  const [month, setMonth] = useState<number>(currentMonth)
  const [year, setYear] = useState<number>(currentYear)

  const prevYear = () => {
    if (year > minYear) {
      setYear((prevYearValue) => prevYearValue - 1)
    }
  }

  const nextYear = () => {
    if (year < maxYear) {
      setYear((prevYearValue) => prevYearValue + 1)
    }
  }

  useEffect(() => {
    setDays(month, year)
  }, [month, year])

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
            {year}
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
              month={month}
              onClick={() => setMonth(index)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
