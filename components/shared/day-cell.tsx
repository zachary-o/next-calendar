import React from "react"

interface Props {
  date: number
  weekDay: string
  className?: string
}

export const DayCell: React.FC<Props> = ({ date, weekDay, className }) => {
  return (
    <div className="h-50 flex flex-1 border border-gray-400">
      <div className="w-full p-2 flex flex-row items-center justify-between">
        <span>{date}</span>
        <span>{weekDay}</span>
      </div>
    </div>
  )
}
