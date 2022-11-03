import {
  getUserSelectors,
  useDeleteUserMutation,
  usersApiSlice,
  useUpdateUserMutation,
} from "@/features/users/usersApiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Confirmation from "@/components/Modals/Confirmation/Alert/Confirmation";
import { TypeUser } from "@/features/users/types";
import { selectUserQuery, setUserPageQuery } from "./userSlice";
import { useAppDispatch } from "@/app/store";
import { IconButton } from "@mui/material";

const EditUserForm = ({ id }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = useSelector(selectUserQuery);
  const { selectById } = getUserSelectors(query);

  useEffect(() => {
    const result = dispatch(usersApiSlice.endpoints.getUsers.initiate(query));
    dispatch(setUserPageQuery(query));

    return result.unsubscribe;
  }, [dispatch, query]);

  const user = useSelector(selectById(id));

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const [editUser, setEditUser] = useState<TypeUser | any>({});

  useEffect(() => {
    setEditUser(user);
  }, [user]);

  const onSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser({
        id: user.id,
        ...editUser,
      });
      router.push("/users");
    } catch (error) {}
  };

  const handleOnChangeText = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value }: { name: string; value?: string } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const onDeleteUser = async () => {
    try {
      await deleteUser({
        id: user.id,
      });
      router.push("/users");
    } catch (error) {}
  };

  if (!user || editUser === undefined || Object.keys(editUser).length === 0)
    return <p>Loading</p>;

  return (
    <Grid component={"form"} container spacing={2} mt={4} onSubmit={onSaveUser}>
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h5" component="h5" gutterBottom>
            {user.name}
          </Typography>
          <Box display={"flex"}>
            <IconButton color="info" type="submit">
              <SaveIcon fontSize="large" className="cursor" />
            </IconButton>
            <Confirmation
              onClickYes={onDeleteUser}
              text={"Are you sure want to remove?"}
            >
              <IconButton color="info">
                <DeleteIcon fontSize="large" className="cursor" />
              </IconButton>
            </Confirmation>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="cognizant_username"
            name="cognizant_username"
            label="Cognizant Username"
            placeholder="Cognizant Username"
            value={editUser?.cognizant_username || ""}
            onChange={handleOnChangeText}
            {...(editUser &&
              editUser["cognizant_username"] && {
                error: editUser.cognizant_username.trim() === "",
                helperText:
                  editUser.cognizant_username.trim() === ""
                    ? "Empty field"
                    : "",
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="cognizant_user_id"
            name="cognizant_user_id"
            label="Cognizant Id"
            placeholder="Cognizant Id"
            value={editUser?.cognizant_user_id || ""}
            onChange={handleOnChangeText}
            {...(editUser &&
              editUser["cognizant_user_id"] && {
                error: editUser.cognizant_user_id.trim() === "",
                helperText:
                  editUser.cognizant_user_id.trim() === "" ? "Empty field" : "",
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="first_name"
            name="first_name"
            label="First Name"
            placeholder="First Name"
            value={editUser?.first_name || ""}
            onChange={handleOnChangeText}
            {...(editUser &&
              editUser["first_name"] && {
                error: editUser.first_name.trim() === "",
                helperText:
                  editUser.first_name.trim() === "" ? "Empty field" : "",
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="last_name"
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            value={editUser?.last_name || ""}
            onChange={handleOnChangeText}
            {...(editUser &&
              editUser["last_name"] && {
                error: editUser.last_name.trim() === "",
                helperText:
                  editUser.last_name.trim() === "" ? "Empty field" : "",
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="role"
            name="role"
            label="Role"
            placeholder="Role"
            value={editUser?.role || ""}
            onChange={handleOnChangeText}
            {...(editUser &&
              editUser["role"] && {
                error: editUser.role.trim() === "",
                helperText: editUser.role.trim() === "" ? "Empty field" : "",
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            id="telegram_ref_id"
            name="telegram_ref_id"
            label="Telegram Id"
            placeholder="Telegram Id"
            value={editUser?.telegram_ref_id || ""}
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="team_name"
            name="team_name"
            label="Team Name"
            placeholder="Team Name"
            value={editUser?.team_name || ""}
            onChange={handleOnChangeText}
            {...(editUser &&
              editUser["team_name"] && {
                error: editUser.team_name.trim() === "",
                helperText:
                  editUser.team_name.trim() === "" ? "Empty field" : "",
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            id="account_name"
            name="account_name"
            label="Account Name"
            placeholder="Account Name"
            value={editUser?.account_name || ""}
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            id="title"
            name="title"
            label="Title"
            placeholder="Title"
            value={editUser?.title || ""}
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default EditUserForm;
