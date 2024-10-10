"use client"

import { monthNames } from "@/constants/monthsNames"
import { daysOfWeek } from "@/constants/weekdaysNames"
import { getTaskById } from "@/lib/get-task-by-id"
import { getTasksForMonth } from "@/lib/get-tasks-for-month"
import { Task } from "@prisma/client"
import { Plus } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/mode-toggle"
import { Arrow } from "./arrow"
import { AuthModal } from "./auth-modal"
import { CalendarPopover } from "./calendar-popover"
import { DayCell } from "./day-cell"
import { ProfileButton } from "./profile-button"
import { TaskModal } from "./task-modal"
import { useSession } from "next-auth/react"
import { toast } from "@/hooks/use-toast"

interface Props {
  className?: string
}

export const CalendarContainer: React.FC<Props> = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const currentDate = new Date()
  const [showModal, setShowModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear()
  )
  const [tasksByMonth, setTasksByMonth] = useState<Task[]>([])
  const [task, setTask] = useState<Task>()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const firstDayOfMonth =
    (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7

  const prevMonth = (): void => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
  }
  const nextMonth = (): void => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const selectedYear = searchParams.get("year")
  const selectedMonth = searchParams.get("month")
  const selectedDay = searchParams.get("day")
  const selectedTaskId = searchParams.get("id")

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [selectedYear, selectedMonth, selectedDay])

  useEffect(() => {
    async function fetchTask(): Promise<void> {
      if (!selectedTaskId || isNaN(Number(selectedTaskId))) return
      const task = await getTaskById(Number(selectedTaskId))
      setTask(task)
    }

    fetchTask()
  }, [selectedTaskId])

  const fetchAllTasks = async (): Promise<void> => {
    if (status === "authenticated" && session) {
      const tasks = await getTasksForMonth(currentYear, currentMonth + 1)
      setTasksByMonth(tasks)
    }
  }

  useEffect(() => {
    fetchAllTasks()
  }, [currentMonth, currentYear, status])

  const handleOpenModal = (isNew: boolean = false): void => {
    if (status === "unauthenticated" && !session) {
      toast({
        title: "Pliease Sign In or Sign up in order to add tasks",
        variant: "destructive"
      })
    } else {
      setShowModal(true)
      if (isNew) {
        setTask(undefined)
      }
    }
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
    setTask(undefined)
    router.replace("/")
  }

  return (
    <>
      <header className="flex items-center justify-between py-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-5">
          <ModeToggle />
          {
            <AuthModal
              open={showAuthModal}
              fetchAllTasks={fetchAllTasks}
              onClose={() => setShowAuthModal(false)}
            />
          }
          <ProfileButton onClickSignIn={() => setShowAuthModal(true)} />
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
              tasks={tasksByMonth || []}
              fetchAllTasks={fetchAllTasks}
            />
          );
        })}
      </div>
      {showModal && (
        <TaskModal
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          selectedTaskById={task}
          daysInMonth={daysInMonth}
          firstDayOfMonth={firstDayOfMonth}
          handleCloseModal={handleCloseModal}
          onClose={handleCloseModal}
          fetchAllTasks={fetchAllTasks}
        />
      )}
    </>
  );
}
