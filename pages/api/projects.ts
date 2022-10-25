import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"

type ProjectType = {
  empId: string
  empName: string
  purchaseOrderNumber: string
  salesOrderNumber: string
  projectName: string
  startDate: string
  endDate: string
}

type Data = {
  _id: string
  __v: number
}

type PatchType = {
  empId: string
  empName: string
  purchaseOrderNumber: string
  salesOrderNumber: string
  projectName: string
  startDate: string
  endDate: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rawprojects: Buffer | any = await fs.promises.readFile(
    "tmp/data/projects.json"
  )
  const projects = JSON.parse(rawprojects)

  switch (req.method) {
    case "GET":
      return res.status(200).json(projects)
    case "POST":
      const addNewProject = [
        ...projects.projects,
        {
          ...req.body,
          _id:
            new Date().getTime().toString(36) +
            Math.random().toString(36).slice(2),
          v: 0,
        },
      ]

      fs.writeFileSync(
        "tmp/data/projects.json",
        JSON.stringify({ projects: addNewProject }, null, 2)
      )

      return res.status(204).json({ successful: true })
    case "PATCH":
      const updatedProject = projects.projects.map((object) => {
        if (req.body.id === object._id)
          return { ...req.body, _id: object._id, v: 0 }
        return object
      })

      fs.writeFileSync(
        "tmp/data/projects.json",
        JSON.stringify({ projects: updatedProject }, null, 2)
      )

      return res.status(204).json({ successful: true })
    case "DELETE":
      const deleteProject = projects.projects.filter((object) => {
        if (req.body.id === object._id) return false
        return true
      })

      fs.writeFileSync(
        "tmp/data/projects.json",
        JSON.stringify({ projects: deleteProject }, null, 2)
      )

      return res.status(204).json({ successful: true })
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
