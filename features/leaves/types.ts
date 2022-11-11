import { Dayjs } from "dayjs";

export type TypeLeave = {
  id: number;
  user_id: number;
  leave_type: string;
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  half_days: null;
  editable: boolean;
  partial_days: null;
  gcal_event_id: string;
  created_at: Dayjs | null;
  updated_at: Dayjs | null;
  leave_type_id: null;
  users: {
    id: number;
    name: string;
    title: null;
    telegram_ref_id: number;
    first_name: string;
    last_name: string;
    cognizant_user_id: number;
    cognizant_username: string;
    reading_username: boolean;
    reading_user_id: boolean;
    created_at: Dayjs | null;
    updated_at: Dayjs | null;
    team_name: string;
    reading_team_name: boolean;
    authorized: boolean;
    role: string;
    account_name: null;
    reading_account_name: boolean;
    project_team_id: null;
    service_line_id: null;
    is_active: false;
  };
};

export type FormDataLeave = {
  team_name: string;
  start_date: Dayjs | null;
  end_date: Dayjs | null;
};
