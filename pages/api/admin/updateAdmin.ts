import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "@/backend/utils/auth";

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
  const prisma = new PrismaClient();
  const { email, password } = req.body;

  const user = await prisma.admins.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(401).json({
      error: "Email not exisits!",
    });
  }

  const checkExistingPassword = await verifyPassword(password, user.password);
  let hashpassword = null;

  if (!checkExistingPassword) {
    hashpassword = await hashPassword(password);
  } else {
    res.status(500).json({
      error: `You Cannot set exisiting password as new password`,
    });
  }

  try {
    const updateAdmin = await prisma.admins.update({
      where: {
        id: user.id,
      },
      data: {
        authorized: true,
        password: hashpassword,
      },
    });

    res.status(200).json(updateAdmin);
  } catch (error) {
    res.status(403).json({ err: "Error occurred while updating admin." });
  }
}
