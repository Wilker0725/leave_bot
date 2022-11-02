import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { OptionalObjectSchema, ObjectShape } from "yup/lib/object";

export function validateUsers(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    if (["POST", "PUT"].includes(method)) {
      try {
        await schema.validate(body);
      } catch (error) {
        return res.status(400).json({ error: `${error}` });
      }
    }
    await handler(req, res);
  };
}
