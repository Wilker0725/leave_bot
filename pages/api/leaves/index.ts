import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { removeQuotes } from "@/backend/utils/validation";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    team_name?: string;
    start_date?: string;
    end_date?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const { body, query } = req;
    const { page = 1, limit = 10 } = body;
    const { team_name, start_date, end_date } = query;

    console.log();

    const queryFilter = {
      where: {
        user: {
          team_name: {
            contains: removeQuotes(team_name),
          },
        },
        start_date: {
          gte: removeQuotes(start_date),
        },
        end_date: {
          lte: removeQuotes(end_date),
        },
      },
    };

    const leaves = await prisma.leaves.findMany({
      skip: (page - 1) * limit,
      take: limit * 1,
      ...queryFilter,
      include: {
        user: true,
      },
    });

    const allMatchedLeaves = await prisma.leaves.findMany({
      ...queryFilter,
    });

    const recordCount = allMatchedLeaves.length;

    res.status(200).json({
      leaves: leaves,
      totalPages: Math.ceil(recordCount / limit),
      currentPage: page,
      recordCount: recordCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sorry unable to retrieve leaves from database." });
  } finally {
    await prisma.$disconnect();
  }
}
