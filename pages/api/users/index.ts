import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    team_name?: string
    cognizant_username?: string
    cognizant_user_id?: string
  }
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] })

  try {
    const { body, query } = req
    const { page = 1, limit = 10 } = body
    const { team_name, cognizant_username, cognizant_user_id } = query

    const users = await prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit * 1,
      where: {
        team_name: {
          contains: team_name?.replace(/["']/g, ""),
        },
        cognizant_username: {
          contains: cognizant_username?.replace(/["']/g, ""),
        },
        cognizant_user_id: {
          contains: cognizant_user_id?.replace(/["']/g, ""),
        },
      },
      include: {
        _count: true,
      },
    })

    const allMatchUsers = await prisma.users.findMany({
      where: {
        team_name: {
          contains: team_name?.replace(/["']/g, ""),
        },
        cognizant_username: {
          contains: cognizant_username?.replace(/["']/g, ""),
        },
        cognizant_user_id: {
          contains: cognizant_user_id?.replace(/["']/g, ""),
        },
      },
    })

    const recordCount = allMatchUsers.length

    res.status(200).json({
      users: users,
      totalPages: Math.ceil(recordCount / limit),
      currentPage: page,
      recordCount: recordCount,
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sorry unable to retrieve users from database." })
  } finally {
    await prisma.$disconnect()
  }
}
