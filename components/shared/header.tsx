"use client"

import { monthNames } from "@/constants/monthsNames"
import { useMonthDays, useSetMonth } from "@/hooks"
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/mode-toggle"

interface Props {
  className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
  const { currentYear, currentMonth, prevMonth, nextMonth } = useSetMonth()
  const days = useMonthDays(currentMonth, currentYear)

  return (
    <header className="flex items-center justify-between py-8">
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
          <Button className="hover:bg-transparent" variant="ghost" onClick={prevMonth}>
            <ChevronLeft />
          </Button>
          <span className="min-w-20 text-center">{monthNames[currentMonth]}</span>
          <Button className="hover:bg-transparent" variant="ghost" onClick={nextMonth}>
            <ChevronRight />
          </Button>
        </div>
        <Button variant="outline" size="lg">
          <Calendar />
        </Button>
      </div>
    </header>
  )
}
