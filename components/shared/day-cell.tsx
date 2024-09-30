"use client"

import { cn } from "@/lib/utils"
import { Task } from "@prisma/client"
import { useRouter } from "next/navigation"
import React from "react"
import { TasksPreview } from "./tasks-preview"
interface Props {
  day: number
  currentDate: Date
  currentMonth: number
  currentYear: number
  dayOfWeek: string
  tasks: Task[]
  className?: string
}

export const DayCell: React.FC<Props> = ({
  day,
  currentDate,
  currentMonth,
  currentYear,
  dayOfWeek,
  tasks,
  className,
}) => {
  const router = useRouter()
  const tasksByDay = tasks.filter(
    (task) => Number(task.taskDate.slice(0, 2)) === day
  )

  const isToday =
    currentDate &&
    day! === currentDate.getDate() &&
    currentMonth === currentDate.getMonth() &&
    currentYear === currentDate.getFullYear()

  const handleDayCellClick = () => {
    router.push(`?year=${currentYear}&month=${currentMonth + 1}&day=${day}`)
  }

  return (
    <div
      className={cn(
        "h-36 flex flex-col border border-gray-500 hover:bg-blue-50",
        {
          "bg-green-100": isToday,
        },
        className
      )}
    >
      <div
        className="w-full p-2 flex flex-row items-center justify-between cursor-pointer"
        onClick={handleDayCellClick}
      >
        <span
          className={cn("text-sm font-bold", {
            "text-black": isToday,
            "text-gray-500": !isToday,
          })}
        >
          {day}
        </span>
        <span
          className={cn("text-sm font-bold", {
            "text-black": isToday,
            "text-gray-500": !isToday,
          })}
        >
          {dayOfWeek}
        </span>
      </div>
      <TasksPreview
        day={day}
        currentMonth={currentMonth}
        currentYear={currentYear}
        tasks={tasksByDay}
      />
    </div>
  )
}
