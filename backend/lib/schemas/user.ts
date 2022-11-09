import { object, string, TypeOf } from "yup";

export const userSchema = object().shape({
  emp_id: string().required("Employee id is a required field"),
  emp_name: string().required("Employee name is a required field"),
  project_name: string().required("Project name is a required field"),
  po_number: string().required("Purchase order number is a required field"),
  so_number: string().required("Sales order number is a required field"),
  start_date: string().required("Start date is a required field"),
  end_date: string().required("End date is a required field"),
});

export type Users = TypeOf<typeof userSchema>;
