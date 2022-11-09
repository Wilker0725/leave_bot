export type Project = {
  id: number
  project_name: string
  emp_name: string
  emp_id: string
  po_number: string
  so_number: string
  start_date: Date
  end_date: Date
}

export type ProjectSearchFormData = {
  project_name: string
  emp_name: string
  emp_id: string
  sort_by: string
}

