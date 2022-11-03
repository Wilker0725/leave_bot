import { object, string, TypeOf } from "yup";

export const userSchema = object().shape({
  cognizant_user_id: string().required(),
  cognizant_username: string().required(),
  name: string().required(),
  first_name: string().required(),
  last_name: string().required(),
  role: string().required(),
  team_name: string().required(),
});

export type Users = TypeOf<typeof userSchema>;
