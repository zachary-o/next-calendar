"use client";

import { toast } from "@/hooks/use-toast";
import { updateTask } from "@/lib/update-task";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface Props {
  day: number;
  currentMonth: number;
  currentYear: number;
  tasks: Task[];
  fetchAllTasks: () => void;
}

export const TasksPreview: React.FC<Props> = ({
  day,
  currentMonth,
  currentYear,
  tasks,
  fetchAllTasks,
}) => {
  const router = useRouter();

  const handleTaskClick = async (id: number) => {
    router.push(
      `?year=${currentYear}&month=${currentMonth + 1}&day=${day}&id=${id}`
    );
  };

  const handleCheckboxChange = async (task: Task) => {
    const newStatus =
      task.status === "NOT_STARTED" ? "COMPLETED" : "NOT_STARTED";
    try {
      await updateTask({ ...task, status: newStatus }, task.id);
      toast({
        title: "Status updated!",
      });
      fetchAllTasks();
    } catch (error) {
      console.error("Error updating task status", error);
      toast({
        title: "Error updating task status",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <ScrollArea className="w-full">
      {tasks.length > 0
        ? tasks.map((task) => (
            <div
              key={task.id}
              className="text-sm p-2 text-black hover:cursor-pointer"
            >
              <div className="flex flex-row gap-2">
                <Checkbox
                  checked={task.status === "COMPLETED"}
                  onCheckedChange={() => {
                    handleCheckboxChange(task);
                  }}
                />{" "}
                <p
                  className="dark:text-white dark:hover:text-black"
                  onClick={() => handleTaskClick(task.id)}
                >
                  {task.name}
                </p>
              </div>
              <Separator className="my-1 bg-slate-300 h-[1px]" />
            </div>
          ))
        : null}
    </ScrollArea>
  );
};
