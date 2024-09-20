import { Day, getMonthDays } from "@/lib/get-month-days"
import { create } from "zustand"

interface State {
  days: Day[]
  setDays: (currentMonth: number, currentYear: number) => void
}

export const useDaysStore = create<State>()((set) => ({
  days: [],
  setDays: (currentMonth: number, currentYear: number) => {
    const newDays = getMonthDays(currentMonth, currentYear)
    set({ days: newDays })
  },
}))
