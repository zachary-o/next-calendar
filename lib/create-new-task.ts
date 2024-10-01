"use server";

import { prisma } from "@/prisma/prisma-client";
import { TFormNewTaskValues } from "@/schemas/new-task-schema";
import { TaskStatus } from "@prisma/client";
import { getUserSession } from "./get-user-session";

export async function createNewTask(body: TFormNewTaskValues) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    if (!findUser) {
      throw new Error("User not found");
    }

    await prisma.task.create({
      data: {
        userId: findUser.id,
        name: body.name,
        description: body.description,
        taskDate: body.taskDate,
        status: TaskStatus.NOT_STARTED,
      },
    });
  } catch (error) {
    console.log("[CREATE NEW TASK] Error: ", error);
    throw error;
  }
}
