import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { removeQuotes } from "@/backend/utils/validation";
import { userSchema } from "@/backend/lib/schemas/user";
import { validateUsers } from "@/backend/lib/middlewares/validations";
import * as Constant from "@/backend/config/constant";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    team_name?: string;
    cognizant_username?: string;
    cognizant_user_id?: string;
    page?: string;
    limit?: string;
  };
}

export async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });
  const { body, query, method } = req;

  switch (method) {
    case "GET":
      try {
        const {
          team_name,
          cognizant_username,
          cognizant_user_id,
          page,
          limit,
        } = query;
        const currentPage = page ? parseInt(page as string, 10) : Constant.PAGE;
        const currentLimit = limit
          ? parseInt(limit as string, 10)
          : Constant.LIMIT;

        const queryFilter = {
          where: {
            team_name: {
              contains: removeQuotes(team_name),
            },
            cognizant_username: {
              contains: removeQuotes(cognizant_username),
            },
            cognizant_user_id: {
              contains: removeQuotes(cognizant_user_id),
            },
            is_active: true,
          },
        };

        const users = await prisma.users.findMany({
          skip: (currentPage - 1) * currentLimit,
          take: currentLimit * 1,
          ...queryFilter,
          include: {
            _count: true,
          },
        });

        const allMatchUsers = await prisma.users.findMany({
          ...queryFilter,
        });

        const recordCount = allMatchUsers.length;

        res.status(200).json({
          users: users,
          totalPages: Math.ceil(recordCount / currentLimit),
          currentPage: currentPage,
          recordCount: recordCount,
        });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Sorry unable to retrieve users from database." });
      } finally {
        await prisma.$disconnect();
      }
      break;
    case "POST":
      try {
        const today = new Date();
        const formattedDate = today.toISOString();
        const { cognizant_user_id } = body;

        const userExist = await prisma.users.findFirst({
          where: {
            cognizant_user_id: cognizant_user_id,
            is_active: true,
          },
        });

        if (userExist) {
          return res.status(409).json({ error: "User record already exist." });
        }

        const user = await prisma.users.create({
          data: {
            ...body,
            created_at: formattedDate,
            updated_at: formattedDate,
          },
        });

        res.status(201).json({ user: user });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Sorry unable to create user from database." });
      } finally {
        await prisma.$disconnect();
      }
      break;
    default:
      res
        .status(500)
        .json({
          error: `${method} request was not supported for this api endpoint.`,
        });
      break;
  }
}

export default validateUsers(userSchema, handler);
