"use client"

import { monthNames } from "@/constants/monthsNames"
import { useMonthDays, useSetMonth } from "@/hooks"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/mode-toggle"
import { CalendarPopover } from "./calendar-popover"
import { Arrow } from "./arrow"

interface Props {
  className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
  const { currentYear, currentMonth, prevMonth, nextMonth } = useSetMonth()
  useMonthDays(currentMonth, currentYear)


  return (
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
          <Arrow direction="left" onClick={prevMonth}/>
            <span className="min-w-32 text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <Arrow direction="right" onClick={nextMonth}/>
        </div>
        <CalendarPopover />
      </div>
    </header>
  )
}
