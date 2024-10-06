"use client";

import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { TasksPreview } from "./tasks-preview";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
interface Props {
  day: number;
  currentDate: Date;
  currentMonth: number;
  currentYear: number;
  dayOfWeek: string;
  tasks: Task[];
  fetchAllTasks: () => void;
  className?: string;
}

export const DayCell: React.FC<Props> = ({
  day,
  currentDate,
  currentMonth,
  currentYear,
  dayOfWeek,
  tasks,
  fetchAllTasks,
  className,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const tasksByDay = tasks.filter(
    (task) => Number(task.taskDate.slice(0, 2)) === day
  );
  const dayCellDate = new Date(`${currentYear}-${currentMonth + 1}-${day}`);

  const isToday =
    currentDate &&
    day! === currentDate.getDate() &&
    currentMonth === currentDate.getMonth() &&
    currentYear === currentDate.getFullYear();

  const isPast = dayCellDate < currentDate && !isToday;

  const handleDayCellClick = () => {
    if (status === "unauthenticated" && !session) {
      toast({
        title: "Pliease Sign In or Sign up in order to add tasks",
        variant: "destructive",
      });
    } else {
      router.push(`?year=${currentYear}&month=${currentMonth + 1}&day=${day}`);
    }
  };

  console.log('Number("09")', Number("09"));

  return (
    <div
      className={cn(
        "h-36 flex flex-col border border-gray-500 hover:bg-blue-400 dark:hover:text-black",
        {
          "bg-green-200": isToday,
        },
        className
      )}
    >
      <div
        className={cn(
          "w-full p-2 flex flex-row items-center justify-between cursor-pointer",
          {
            "pointer-events-none":
              isPast || (status === "unauthenticated" && !session),
          }
        )}
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
        fetchAllTasks={fetchAllTasks}
      />
    </div>
  );
};
