import { object, string, TypeOf } from "yup";

export const userSchema = object().shape({
  cognizant_user_id: string().required("Cognizant id is a required field"),
  cognizant_username: string().required("Cognizant username is a required field"),
  name: string().required("Name is a required field"),
  first_name: string().required("First name is a required field"),
  last_name: string().required("Last name is a required field"),
  role: string().required("Role is a required field"),
  team_name: string().required("Team name is a required field"),
});

export type Users = TypeOf<typeof userSchema>;
