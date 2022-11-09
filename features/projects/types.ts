export type Project = {
  id: number
  projectName: string
  empName: string
  empId: string
  purchaseOrderNumber: string
  salesOrderNumber: string
  startDate: Date
  endDate: Date
}

export type ProjectSearchFormData = {
  projectName: string
  empName: string
  empId: string
  sort_by: string
}

