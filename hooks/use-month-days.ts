import { useCurrentMonthStore } from "@/store/currentMonth"
import { useEffect } from "react"

export const useMonthDays = (currentMonth: number, currentYear: number) => {
 const setDays  = useCurrentMonthStore(state => state.setDays)

  useEffect(() => {
    setDays(currentMonth, currentYear)
  }, [currentMonth, currentYear])

}
