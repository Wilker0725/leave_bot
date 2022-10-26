import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import { TypeUser } from "@/features/users/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rawusers: Buffer | any = await fs.promises.readFile(
    "tmp/data/users.json"
  )
  const users = JSON.parse(rawusers)

  switch (req.method) {
    case "GET":
      return res.status(200).json(users)
    case "POST":
      const addNewLeave = [
        ...users.users,
        {
          ...req.body,
          _id:
            new Date().getTime().toString(36) +
            Math.random().toString(36).slice(2),
          v: 0,
        },
      ]

      fs.writeFileSync(
        "tmp/data/users.json",
        JSON.stringify({ users: addNewLeave }, null, 2)
      )

      return res.status(204).json({ successful: true })
    case "PATCH":
      const updatedLeave = users.users.map((object) => {
        if (req.body.id === object._id)
          return { ...req.body, _id: object._id, v: 0 }
        return object
      })

      fs.writeFileSync(
        "tmp/data/users.json",
        JSON.stringify({ users: updatedLeave }, null, 2)
      )

      return res.status(204).json({ successful: true })
    case "DELETE":
      const deleteLeave = users.users.filter((object) => {
        if (req.body.id === object._id) return false
        return true
      })

      fs.writeFileSync(
        "tmp/data/users.json",
        JSON.stringify({ users: deleteLeave }, null, 2)
      )

      return res.status(204).json({ successful: true })
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
