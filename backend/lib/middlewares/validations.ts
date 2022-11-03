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
        await schema.validate(body, { abortEarly: false });
      } catch (error) {
        let err = {};
        error.inner.forEach((e) => {
          err = {
            ...err,
            [e.path]: e.errors[0],
          };
        });
        return res.status(400).json({
          error: err,
        });
      }
    }
    await handler(req, res);
  };
}
