import { Task } from "@prisma/client"
import axios from "axios"
import { getUserSession } from "./get-user-session"

export async function getTasksForMonth(
  year: number,
  month: number
): Promise<Task[]> {
  const response = await axios.get(`/api/tasks/${year}/${month}`)
  if (response.status === 200) {
    const tasks: Task[] = response.data
    return tasks
  } else {
    console.log(`Failed to fetch tasks, status: ${response.status}`)
    return []
  }
}
