import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] })

  try {
    const { body } = req
    const { page = 1, limit = 10 } = body
    const leaves = await prisma.leaves.findMany({
      skip: (page - 1) * limit,
      take: limit * 1,
      where: {
        user: {
          team_name: "OSG",
        },
      },
      include: {
        user: true,
      },
    })

    const count = await prisma.leaves.count()

    res.status(200).json({
      leaves: leaves,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      recordCount: count,
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sorry unable to retrieve leaves from database." })
  } finally {
    await prisma.$disconnect()
  }
}
