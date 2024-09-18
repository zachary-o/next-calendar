import { useState } from "react"

export const useSetMonth = () => {
  const today = new Date()
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth())

  const prevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentYear(currentMonth - 1)
      setCurrentMonth(11)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }
  const nextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1)
      setCurrentMonth(0)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return { currentYear, currentMonth, prevMonth, nextMonth }
}
