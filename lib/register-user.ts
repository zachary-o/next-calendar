"use server"

import { prisma } from "@/prisma/prisma-client"
import { Prisma } from "@prisma/client"
import { hashSync } from "bcryptjs"

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (user) {
      return { error: "Email already exists" };
    }

    await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    })
  } catch (error) {
    console.log("[SIGN UP USER] Error: ", error)
  }
}
