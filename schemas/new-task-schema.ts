import {z } from "zod"

export const newTaskSchema = z.object({
    name: z.string().min(4, {message: "Enter task name"}),
    description: z.string().min(4, {message: "Description must be at least 10 characters"}),
    taskDate: z
    .string()
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, { message: "Invalid date format. Use DD.MM.YYYY" })
    .refine((val) => {
      const [day, month, year] = val.split('.').map(Number);
      const date = new Date(year, month - 1, day);
      const isValidDate = 
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

      return isValidDate;
    }, { message: "Invalid date" })
});

export type TFormNewTaskValues = z.infer<typeof newTaskSchema>