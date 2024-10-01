"use server"

import { prisma } from "@/prisma/prisma-client"
import { Prisma } from "@prisma/client"
import { hashSync } from "bcryptjs"
import { getUserSession } from "./get-user-session"

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession()

    if (!currentUser) {
      throw new Error("User not found")
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    })

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    })
  } catch (error) {
    console.log("[UPDATE_USER Error]", error)
    throw error
  }
}
