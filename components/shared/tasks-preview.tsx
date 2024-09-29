"use client"

import { cn } from "@/lib/utils"
import { Task } from "@prisma/client"
import { useRouter } from "next/navigation"
import React from "react"
import { Checkbox } from "../ui/checkbox"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"

interface Props {
  day: number
  currentMonth: number
  currentYear: number
  tasks: Task[]
  className?: string
}

export const TasksPreview: React.FC<Props> = ({
  day,
  currentMonth,
  currentYear,
  tasks,
  className,
}) => {
  const router = useRouter()

  const handleTaskClick = async (id: number) => {
    router.push(
      `?year=${currentYear}&month=${currentMonth + 1}&day=${day}&id=${id}`
    )
  }
console.log('tasks', tasks)
  return (
    <ScrollArea className={cn("w-full", className)}>
      {tasks.length > 0
        ? tasks.map((task) => (
            <div
              key={task.id}
              className="text-sm p-2 text-black hover:cursor-pointer"
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="flex flex-row gap-2">
                <Checkbox /> {task.name}
              </div>
              <Separator className="my-1 bg-slate-300 h-[1px]" />
            </div>
          ))
        : null}
    </ScrollArea>
  )
}
