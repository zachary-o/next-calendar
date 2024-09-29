import { Task } from "@prisma/client";
import axios from "axios";

export async function getTaskById(id: number): Promise<Task> {
  const response = await axios.get(`/api/task/${id}`);
  const task = response.data;
  return task;
}
