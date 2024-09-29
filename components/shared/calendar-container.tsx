"use client";

import { monthNames } from "@/constants/monthsNames";
import { daysOfWeek } from "@/constants/weekdaysNames";
import { getTaskById } from "@/lib/get-task-by-id";
import { getTasksForMonth } from "@/lib/get-tasks-for-month";
import { Task } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { Arrow } from "./arrow";
import { CalendarPopover } from "./calendar-popover";
import { DayCell } from "./day-cell";
import { TaskModal } from "./task-modal";

interface Props {
  className?: string;
}

export const CalendarContainer: React.FC<Props> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDate = new Date();
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear()
  );
  const [tasksByMonth, setTasksByMonth] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDayOfMonth =
    (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const selectedYear = searchParams.get("year");
  const selectedMonth = searchParams.get("month");
  const selectedDay = searchParams.get("day");
  const selectedTaskId = searchParams.get("id");

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  useEffect(() => {
    async function fetchTask() {
      if (!selectedTaskId || isNaN(Number(selectedTaskId))) return;
      const task = await getTaskById(Number(selectedTaskId));
      setTask(task);
    }

    fetchTask();
  }, [selectedTaskId]);

  const fetchAllTasks = async () => {
    setLoading(true);
    const tasks = await getTasksForMonth(currentYear, currentMonth + 1);
    setTasksByMonth(tasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllTasks();
  }, [currentMonth, currentYear]);

  const handleOpenModal = (isNew = false) => {
    setShowModal(true);
    if (isNew) {
      setTask(undefined);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTask(undefined);
    router.replace("/");
  };

  console.log("tasksByMonth", tasksByMonth);

  return (
    <>
      <header className="flex items-center justify-between py-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-5">
          <ModeToggle />
          <Button size="icon" onClick={() => handleOpenModal(true)}>
            <Plus />
          </Button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-between">
            <Arrow direction="left" onClick={prevMonth} />
            <span className="min-w-32 text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <Arrow direction="right" onClick={nextMonth} />
          </div>
          <CalendarPopover
            currentMonth={currentMonth}
            currentYear={currentYear}
            setCurrentMonth={setCurrentMonth}
            setCurrentYear={setCurrentYear}
          />
        </div>
      </header>
      <div className="grid grid-cols-7">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <div
            key={index}
            className="h-36 flex flex-col border border-gray-500 pointer-events-none opacity-50"
          />
        ))}
        {[...Array(daysInMonth).keys()].map((day) => {
          const dayOfWeek = daysOfWeek[(day + firstDayOfMonth) % 7];
          return (
            <DayCell
              key={day + 1}
              day={day + 1}
              dayOfWeek={dayOfWeek}
              currentDate={currentDate}
              currentMonth={currentMonth}
              currentYear={currentYear}
              loading={loading}
              tasks={tasksByMonth || []}
            />
          );
        })}
      </div>
      {showModal && (
        <Suspense fallback="Loading...">
          <TaskModal
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            selectedTaskById={task!}
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            fetchAllTasks={fetchAllTasks}
          />
        </Suspense>
      )}
    </>
  );
};
