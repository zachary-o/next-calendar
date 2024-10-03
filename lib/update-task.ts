"use server"

import { prisma } from "@/prisma/prisma-client"
import { Prisma } from "@prisma/client"

export async function updateTask(body: Prisma.TaskUpdateInput, id: number) {
  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        description: body.description,
        taskDate: body.taskDate,
        status: body.status,
      },
    })
  } catch (error) {
    console.log("[UPDATE_TASK Error]", error)
  }
}
