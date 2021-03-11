import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
  const users = await prisma.user.findMany()

  console.log(users)
}

main()
  .catch(err => console.log('error', err))
  .finally(() => prisma.$disconnect())