export interface Day {
    date: number;
    dayOfWeek: string;
  }

export const getMonthDays = (month: number, year: number): Day[] => {
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const daysArray: Day[] = []

  for (
    let day = firstDayOfMonth.getDate();
    day <= lastDayOfMonth.getDate();
    day++
  ) {
    const currentDate = new Date(year, month, day)
    const dayOfWeek = currentDate.toLocaleDateString("en-Us", {weekday: "short"})

    daysArray.push({
        date: day,
        dayOfWeek
    })
  }
  return daysArray
}
