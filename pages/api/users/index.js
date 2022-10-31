import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient({ log: [] })

  try {
    let { team_name, cognizant_username, cognizant_user_id, page, limit } =
      req.query

    let wheres = Object.keys(req.query).reduce((acc, cur) => {
      if (["limit", "page"].includes(cur)) return acc

      if (req.query[cur] !== undefined) {
        return {
          [cur]: {
            contains: req.query[cur].replace(/["']/g, ""),
          },
        }
      }

      return acc
    }, {})

    const users = await prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit * 1,
      where: {
        ...wheres,
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
      currentPage: +page,
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
