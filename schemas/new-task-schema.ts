import {z } from "zod"

export const newTaskSchema = z.object({
    name: z.string().min(4, {message: "Enter task name"}),
    description: z.string().min(4, {message: "Description must be at least 10 characters"}),
    taskDate: z
    .string()
    .regex(
      /^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/, 
      { message: "Invalid date format. Use DD.MM.YYYY, HH:mm" }
    )
    .refine((val) => {
      const [datePart, timePart] = val.split(', ');
      
      // Validate the date part
      const [day, month, year] = datePart.split('.').map(Number);
      const date = new Date(year, month - 1, day);
      const isValidDate = 
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

      // Validate the time part
      const [hours, minutes] = timePart.split(':').map(Number);
      const isValidTime = 
        hours >= 0 && hours <= 23 &&
        minutes >= 0 && minutes <= 59;

      return isValidDate && isValidTime;
    }, { message: "Invalid date or time" })
});

export type TFormNewTaskValues = z.infer<typeof newTaskSchema>