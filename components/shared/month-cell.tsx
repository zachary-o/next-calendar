import { cn } from "@/lib/utils"
import React from "react"

interface Props {
  month: string
  selectedMonth: number
  index: number
  onClick: () => void
  className?: string
}

export const MonthCell: React.FC<Props> = ({
  month,
  selectedMonth,
  index,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "w-full px-2 py-1 text-center cursor-pointer text-sm rounded-sm hover:bg-blue-300",
        { "bg-red-300": selectedMonth === index }
      )}
      onClick={onClick}
    >
      {month}
    </div>
  )
}
