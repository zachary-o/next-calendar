"use client"

import { useDaysStore } from "@/store/days"
import React from "react"
import { DayCell } from "./day-cell"

interface Props {
  className?: string
}

export const CalendarContainer: React.FC<Props> = ({ className }) => {
  const days = useDaysStore(state => state.days)
  
  return (
    <div className="grid grid-cols-7">
      {days.map((day, index) => (
        <DayCell key={index} {...day}/>
      ))}
    </div>
  )
}
