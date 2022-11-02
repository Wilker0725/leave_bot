import type { NextApiRequest, NextApiResponse } from "next";
import config from "@/backend/config/uiConfig.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!config) {
      throw new Error("Unable to retrieve ui config.");
    }
    res.status(200).json({ ui_config: config });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
}
