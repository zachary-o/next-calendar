import { useDaysStore } from "@/store/days"
import { useEffect } from "react"

export const useMonthDays = (currentMonth: number, currentYear: number) => {
  const setDays = useDaysStore((state) => state.setDays)

  useEffect(() => {
    setDays(currentMonth, currentYear)
  }, [currentMonth, currentYear])
}
