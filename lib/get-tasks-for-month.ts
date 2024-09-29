import { Task } from "@prisma/client"
import axios from "axios"

export async function getTasksForMonth(year: number, month: number): Promise<Task[]> {
  const response = await axios.get(`/api/tasks/${year}/${month}`)
  const tasks = response.data
  return tasks
}
