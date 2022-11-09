import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { removeQuotes } from "@/backend/utils/validation";
import { userSchema } from "@/backend/lib/schemas/user";
import { validateUsers } from "@/backend/lib/middlewares/validations";
import * as Constant from "@/backend/config/constant";

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    project_name?: string;
    emp_name?: string;
    emp_id?: string;
    po_number?: string;
    so_number?: string;
    page?: string;
    limit?: string;
    sort_by?: string;
    direction?: string;
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
          project_name,
          emp_name,
          emp_id,
          po_number,
          so_number,
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
          : Constant.ORDER_BY.projects.sort_by;
        const currentDirection = direction
          ? removeQuotes(direction)
          : Constant.ORDER_BY.projects.direction;

        const queryFilter = {
          where: {
            project_name: {
              contains: removeQuotes(project_name),
            },
            emp_id: {
              contains: removeQuotes(emp_id),
            },
            emp_name: {
              contains: removeQuotes(emp_name),
            },
            po_number: {
              contains: removeQuotes(po_number),
            },
            so_number: {
              contains: removeQuotes(so_number),
            },
            is_active: true,
          },
        };

        const orderBy = [
          {
            [currentSort]: currentDirection,
          },
        ];

        const resources = await prisma.projects.findMany({
          skip: (currentPage - 1) * currentLimit,
          take: currentLimit * 1,
          orderBy: orderBy,
          ...queryFilter,
        });

        const allMatchResouces = await prisma.projects.findMany({
          ...queryFilter,
        });

        const recordCount = allMatchResouces.length;

        res.status(200).json({
          resources: resources,
          totalPages: Math.ceil(recordCount / currentLimit),
          currentPage: currentPage,
          recordCount: recordCount,
        });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "Sorry unable to retrieve projects from database." });
      } finally {
        await prisma.$disconnect();
      }
      break;
    case "POST":
      try {
        const today = new Date();
        const formattedDate = today.toISOString();
        const { emp_id } = body;

        const resourceExist = await prisma.projects.findFirst({
          where: {
            emp_id: emp_id,
            is_active: true,
          },
        });

        if (resourceExist) {
          return res.status(409).json({ error: "User record already exist." });
        }

        const resource = await prisma.projects.create({
          data: {
            ...body,
            created_at: formattedDate,
            updated_at: formattedDate,
          },
        });

        res.status(201).json({ resource: resource });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "Sorry unable to create user from database." });
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
