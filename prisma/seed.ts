import { hashSync } from "bcryptjs"
import { prisma } from "./prisma-client"

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "Pidar Zaloopko",
        email: "hooynia@gmail.com",
        password: hashSync("azazazaza", 10),
      },
      {
        fullName: "Zaloopa Pidorivna",
        email: "zaloopnia@gmail.com",
        password: hashSync("azazazaza666", 10),
      },
    ],
  })

  await prisma.task.createMany({
    data: [
      {
        name: "shower",
        description: "armpits",
        taskDate: "04.10.2024",
        userId: 1,
        status: "NOT_STARTED",
      },
      {
        name: "breakfast",
        description: "pizza",
        taskDate: "03.10.2024",
        userId: 1,
        status: "NOT_STARTED",
      },
      {
        name: "cleaning",
        description: "bedroom",
        taskDate: "03.10.2024",
        userId: 1,
        status: "NOT_STARTED",
      },
      {
        name: "lunch",
        description: "borscht",
        taskDate: "02.10.2024",
        userId: 2,
        status: "NOT_STARTED",
      },
      {
        name: "lunch",
        description: "borscht",
        taskDate: "01.10.2024",
        userId: 2,
        status: "NOT_STARTED",
      },
      {
        name: "dinner",
        description: "soup with seven zaloop",
        taskDate: "01.10.2024",
        userId: 2,
        status: "NOT_STARTED",
      },
      {
        name: "dinner",
        description: "soup with seven zaloop",
        taskDate: "01.10.2024",
        userId: 2,
        status: "NOT_STARTED",
      },
      {
        name: "dinner",
        description: "soup with seven zaloop",
        taskDate: "01.10.2024",
        userId: 2,
        status: "NOT_STARTED",
      },
    ],
  })
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
}

async function main() {
  try {
    await down()
    await up()
  } catch (error) {
    console.log("error", error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.log("error", error)
    await prisma.$disconnect()
    process.exit(1)
  })
