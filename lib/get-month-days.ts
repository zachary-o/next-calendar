// export interface Day {
//   date: number
//   dayOfWeek: string
//   isCurrentMonth: boolean
//   isToday: boolean
// }

// export const getMonthDays = (month: number, year: number): Day[] => {
//   const firstDayOfMonth = new Date(year, month, 1)
//   const lastDayOfMonth = new Date(year, month + 1, 0)
  
//   const today = new Date()
//   const todayDate = today.getDate()
//   const todayMonth = today.getMonth()
//   const todayYear = today.getFullYear()
  
//   const daysArray: Day[] = []

//   const firstDayIndex = firstDayOfMonth.getDay()
//   const lastDayOfPrevMonth = new Date(year, month, 0).getDate()

//   const startPrevMonthFrom =
//     lastDayOfPrevMonth - (firstDayIndex === 0 ? 6 : firstDayIndex - 1) + 1

//   for (
//     let prevMonthDay = startPrevMonthFrom;
//     prevMonthDay <= lastDayOfPrevMonth;
//     prevMonthDay++
//   ) {
//     const currentDate = new Date(year, month - 1, prevMonthDay)
//     const dayOfWeek = currentDate.toLocaleDateString("en-Us", {
//       weekday: "short",
//     })

//     daysArray.push({
//       date: prevMonthDay,
//       dayOfWeek,
//       isCurrentMonth: false,
//       isToday: false
//     })
//   }

//   for (
//     let day = firstDayOfMonth.getDate();
//     day <= lastDayOfMonth.getDate();
//     day++
//   ) {
//     const currentDate = new Date(year, month, day)
//     const dayOfWeek = currentDate.toLocaleDateString("en-Us", {
//       weekday: "short",
//     })
//     const isToday =
//       day === todayDate && month === todayMonth && year === todayYear


//     daysArray.push({
//       date: day,
//       dayOfWeek,
//       isCurrentMonth: true,
//       isToday
//     })
//   }

//   return daysArray
// }
