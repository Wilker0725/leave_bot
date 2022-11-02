import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { userSchema } from "@/backend/lib/schemas/user";
import { validateUsers } from "@/backend/lib/middlewares/validations";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });
  const {
    body,
    query: { id },
    method,
  } = req;

  const queryFilter = {
    where: {
      id: parseInt(id as string, 10),
      is_active: true,
    },
  };

  switch (method) {
    case "GET":
      try {
        const user = await prisma.users.findFirst({
          ...queryFilter,
        });

        if (!user) {
          return res.status(404).json({
            error: `Sorry the user with id: ${id} was not found.`,
          });
        }

        res.status(200).json({
          user: user,
        });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Sorry unable to retrieve user from database." });
      } finally {
        await prisma.$disconnect();
      }
      break;
    case "PUT":
      try {
        const today = new Date();
        const formattedDate = today.toISOString();

        const userExist = await prisma.users.findFirst({
          ...queryFilter,
        });

        if (!userExist) {
          return res.status(404).json({
            error: `Sorry the user with id: ${id} was not found.`,
          });
        }

        const user = await prisma.users.update({
          ...queryFilter,
          data: {
            ...body,
            updated_at: formattedDate,
          },
        });

        res.status(200).json({ user: user });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Sorry unable to update user from database." });
      } finally {
        await prisma.$disconnect();
      }
      break;
    case "DELETE":
      try {
        const today = new Date();
        const formattedDate = today.toISOString();

        const userExist = await prisma.users.findFirst({
          ...queryFilter,
        });

        if (!userExist) {
          return res.status(404).json({
            error: `Sorry the user with id: ${id} was not found.`,
          });
        }

        await prisma.users.update({
          ...queryFilter,
          data: {
            is_active: false,
            updated_at: formattedDate,
          },
        });

        res.status(204);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Sorry unable to delete user from database." });
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

export default validateUsers(userSchema, handler);
