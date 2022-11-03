import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { removeQuotes } from "@/backend/utils/validation";
import * as Constant from "@/backend/config/constant";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    team_name?: string;
    start_date?: string;
    end_date?: string;
    page?: string;
    limit?: string;
    sort_by?: string;
    direction?: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });
  const { query, method } = req;

  switch (method) {
    case "GET":
      try {
        const {
          team_name,
          start_date,
          end_date,
          page,
          limit,
          sort_by,
          direction,
        } = query;

        const currentPage = page ? parseInt(page as string, 10) : Constant.PAGE;
        const currentLimit = limit
          ? parseInt(limit as string, 10)
          : Constant.LIMIT;

        const currentSort = sort_by
          ? removeQuotes(sort_by)
          : Constant.ORDER_BY.leaves.sort_by;
        const currentDirection = direction
          ? removeQuotes(direction)
          : Constant.ORDER_BY.leaves.direction;

        const queryFilter = {
          where: {
            user: {
              team_name: {
                contains: removeQuotes(team_name),
              },
              is_active: true,
            },
            start_date: {
              gte: removeQuotes(start_date),
            },
            end_date: {
              lte: removeQuotes(end_date),
            },
          },
        };

        const orderBy =
          currentSort === "team_name"
            ? {
                user: {
                  [currentSort]: currentDirection,
                },
              }
            : [
                {
                  [currentSort]: currentDirection,
                },
              ];

        const leaves = await prisma.leaves.findMany({
          skip: (currentPage - 1) * currentLimit,
          take: currentLimit * 1,
          orderBy: orderBy,
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
          totalPages: Math.ceil(recordCount / currentLimit),
          currentPage: currentPage,
          recordCount: recordCount,
        });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Sorry unable to retrieve leaves from database." });
      } finally {
        await prisma.$disconnect();
      }
      break;

    default:
      res.status(500).json({
        error: `${method} request was not supported for this api endpoint.`,
      });
      break;
  }
}
