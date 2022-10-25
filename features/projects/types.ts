import { Dayjs } from "dayjs"

export type DataNewProject = {
  projectName: string
  empName: string
  purchaseOrderNumber: string
  salesOrderNumber: string
  startDate: Dayjs | null
  endDate: Dayjs | null
  _id?: string
  _v: number
}
