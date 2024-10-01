import { getUserSession } from "@/lib/get-user-session"
import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { year: string; month: string } }
) {
  try {
    const user = await getUserSession()
    const { year, month } = params

    if (!user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const monthString = `${month.padStart(2, "0")}.${year}`

    const userTasks = await prisma.task.findMany({
      where: {
        userId: Number(user.id),
        taskDate: {
          endsWith: monthString,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        taskDate: true,
        status: true,
      },
    })

    return NextResponse.json(userTasks)
  } catch (error) {
    console.log("[FETCH_TASKS] Server error", error)
    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}
