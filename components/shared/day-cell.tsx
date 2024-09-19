import { cn } from "@/lib/utils"
import React from "react"

interface Props {
  date: number
  dayOfWeek: string
  isCurrentMonth: boolean
  isToday: boolean
  className?: string
}

export const DayCell: React.FC<Props> = ({
  date,
  dayOfWeek,
  isCurrentMonth,
  isToday,
  className,
}) => {
  return (
    <div
      className={cn(
        "h-36 flex flex-col border border-gray-500 cursor-pointer hover:bg-blue-50",
        {
          "opacity-40": !isCurrentMonth,
          "bg-green-100": isToday,
        }
      )}
    >
      <div className="w-full p-2 flex flex-row items-center justify-between">
        <span
          className={cn("text-sm font-bold hover:text-black", {
            "text-black": isToday,
            "text-gray-500": !isToday, 
          })}
        >
          {date}
        </span>
        <span
          className={cn("text-sm font-bold hover:text-black", {
            "text-black": isToday,
            "text-gray-500": !isToday,
          })}
        >
          {dayOfWeek}
        </span>
      </div>
    </div>
  )
}
