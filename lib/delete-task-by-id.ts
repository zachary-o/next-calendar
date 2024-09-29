import axios from "axios";

export async function deleteTaskById(id: number): Promise<void> {
  const response = await axios.delete(`/api/task/${id}`);
  const task = response.data;
  return task;
}
