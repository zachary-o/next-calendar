import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { year: string; month: string } }
) {
  try {
    const { year, month } = params

    const monthString = `${month.padStart(2, "0")}.${year}`

    const tasks = await prisma.task.findMany({
      where: {
        taskDate: {
          endsWith: monthString
        }
      },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.log("[FETCH_TASKS] Server error", error)
    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}
