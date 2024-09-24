import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import React from "react"

interface Props {
  onClick?: VoidFunction
  className?: string
}

export const ClearButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <button
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <X className="w-5 h-5" />
    </button>
  )
}
