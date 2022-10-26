export type TypeUser = {
  id: number
  name: string
  title?: string
  telegram_ref_id: string
  first_name: string
  last_name: string
  cognizant_user_id: string
  cognizant_username: string
  reading_username: boolean
  reading_user_id: boolean
  created_at: Date
  updated_at: Date
  team_name: string
  reading_team_name: boolean
  authorized: boolean
  role: string
  account_name: string
  reading_account_name: boolean
  project_team_id?: number
  service_line_id?: number
  is_active: boolean
}
