import { prisma } from "./prisma-client"

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "Pidar Zaloopko",
        email: "hooynia@gmail.com",
        password: "azazazazazaza",
      },
      {
        fullName: "Zaloopa Pidorivna",
        email: "zaloopnia@gmail.com",
        password: "azazazazazaza666",
      },
    ],
  })

  await prisma.task.createMany({
    data: [
      {
        name: "shower",
        description: "armpits",
        taskDate: "11.10.2025, 22:50",
        userId: 1,
        status: "NOT_STARTED",
      },
      {
        name: "breakfast",
        description: "pizza",
        taskDate: "11.10.2024, 22:50",
        userId: 1,
        status: "NOT_STARTED",
      },
      {
        name: "cleaning",
        description: "bedroom",
        taskDate: "11.10.2025, 22:50",
        userId: 1,
        status: "NOT_STARTED",
      },
      {
        name: "lunch",
        description: "borscht",
        taskDate: "11.11.2025, 12:50",
        userId: 2,
        status: "NOT_STARTED",
      },
      {
        name: "lunch",
        description: "borscht",
        taskDate: "26.09.2024",
        userId: 2,
        status: "NOT_STARTED",
      },
      {
        name: "dinner",
        description: "soup with seven zaloop",
        taskDate: "26.09.2024",
        userId: 2,
        status: "NOT_STARTED",
      },
      {
        name: "dinner",
        description: "soup with seven zaloop",
        taskDate: "27.09.2024",
        userId: 2,
        status: "NOT_STARTED",
      },
      {
        name: "dinner",
        description: "soup with seven zaloop",
        taskDate: "27.09.2024",
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
