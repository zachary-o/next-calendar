"use client"

import { useCurrentMonthStore } from "@/store/currentMonthAndYear"
import React from "react"
import { DayCell } from "./day-cell"

interface Props {
  className?: string
}

export const CalendarContainer: React.FC<Props> = ({ className }) => {
  const days = useCurrentMonthStore(state => state.days)
  
  return (
    <div className="grid grid-cols-7">
      {days.map((day, index) => (
        <DayCell key={index} {...day}/>
      ))}
    </div>
  )
}
