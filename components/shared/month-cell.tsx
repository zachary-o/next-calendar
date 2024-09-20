import { cn } from "@/lib/utils"
import React from "react"

interface Props {
  month: string
  onClick: () => void
  className?: string
}

export const MonthCell: React.FC<Props> = ({ month, onClick, className }) => {
  return (
    <div
      className={cn(
        "w-full px-2 py-1 text-center cursor-pointer text-sm hover:bg-blue-50"
      )}
      onClick={onClick}
    >
      {month}
    </div>
  )
}
