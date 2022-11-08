import {
  getUserSelectors,
  useDeleteUserMutation,
  usersApiSlice,
  useUpdateUserMutation,
} from "@/features/users/usersApiSlice";
import React, { useEffect, useState } from "react";
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
import { User } from "@/features/users/types";
import { selectUserQuery, setUserPageQuery } from "@/features/users/userSlice";
import { useAppDispatch } from "@/app/store";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Toast from "@/components/Toast";
import { ROLES } from "@/config/roles";

const REQUIRED_FIELD = [
  "cognizant_username",
  "cognizant_user_id",
  "first_name",
  "last_name",
  "team_name",
  "role",
];

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

  const [updateUser, { isLoading, isSuccess, isError, error }]: any =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const [editUser, setEditUser] = useState<Partial<User>>();
  const [dirtyFields, setDirtyFields] = useState({});

  useEffect(() => {
    if (user === undefined) return;

    const {
      account_name,
      cognizant_user_id,
      cognizant_username,
      first_name,
      last_name,
      name,
      team_name,
      telegram_ref_id,
      title,
      role,
    } = user;

    setEditUser({
      account_name,
      cognizant_user_id,
      cognizant_username,
      first_name,
      last_name,
      name,
      team_name,
      telegram_ref_id,
      title,
      role,
    });
  }, [user]);

  useEffect(() => {
    if (isSuccess) router.push("/users");
  }, [isSuccess, router]);

  const onSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await updateUser({
        id: user.id,
        ...editUser,
      });

      if (res.data)
        Toast({
          type: "success",
          message: "User details successfully updated.",
        });
    } catch (error) {
      console.error("Update User Error: ", error);
      Toast({
        type: "error",
        message: "Something when wrong, unable to update user details.",
      });
    }
  };

  const handleOnChangeText = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent
  ) => {
    const { name, value }: { name: string; value?: string } = e.target;

    if (dirtyFields[name] === undefined)
      setDirtyFields({ ...dirtyFields, [name]: true });

    setEditUser({ ...editUser, [name]: value });
  };

  const onDeleteUser = async () => {
    try {
      await deleteUser({
        id: user.id,
      });

      router.push("/users");
      Toast({ type: "success", message: "User successfuly deleted." });
    } catch (error) {
      console.error("Delete User Error: ", error);
      Toast({
        type: "error",
        message: "Something when wrong, unable to deleted user.",
      });
    }
  };

  if (!user || editUser === undefined || Object.keys(editUser).length === 0)
    return <p>Loading</p>;

  let canSave = false;

  if (Object.keys(editUser).length > 0) {
    canSave =
      Object.entries(editUser)
        .filter(([key]) => REQUIRED_FIELD.includes(key))
        .every((item: any) => {
          if (item[1] === null || item[1] === "") return false;

          const hasValue = item[1].trim().length > 0;

          return hasValue;
        }) && !isLoading;
  }

  return (
    <Grid
      component={"form"}
      noValidate
      container
      spacing={2}
      mt={4}
      onSubmit={onSaveUser}
    >
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h5" component="h5" gutterBottom>
            {user.cognizant_username}
          </Typography>
          <Box display={"flex"}>
            <IconButton
              color="info"
              type="submit"
              style={{
                opacity: canSave ? "1" : "0.5",
                cursor: canSave ? "pointer" : "not-allowed",
                pointerEvents: canSave ? "auto" : "none",
              }}
            >
              <SaveIcon fontSize="large" />
            </IconButton>
            <Confirmation
              onClickYes={onDeleteUser}
              text={`Are you sure want to remove ${editUser?.cognizant_username}?`}
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
              dirtyFields["cognizant_username"] &&
              editUser["cognizant_username"].length === 0 && {
                error: editUser.cognizant_username.trim() === "",
                helperText:
                  editUser.cognizant_username.trim() === ""
                    ? "Empty field"
                    : "",
              })}
            {...(error &&
              error.data.error["cognizant_username"] && {
                error: true,
                helperText: error.data.error["cognizant_username"],
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
              dirtyFields["cognizant_user_id"] &&
              editUser["cognizant_user_id"].length === 0 && {
                error: editUser.cognizant_user_id.trim() === "",
                helperText:
                  editUser.cognizant_user_id.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["cognizant_user_id"] && {
                error: true,
                helperText: error.data.error["cognizant_user_id"],
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
              dirtyFields["first_name"] &&
              editUser["first_name"].length === 0 && {
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
              dirtyFields["last_name"] &&
              editUser["last_name"].length === 0 && {
                error: editUser.last_name.trim() === "",
                helperText:
                  editUser.last_name.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["last_name"] && {
                error: true,
                helperText: error.data.error["last_name"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="name"
            name="name"
            label="Name"
            placeholder="Name"
            value={editUser?.name || ""}
            onChange={handleOnChangeText}
            {...(editUser &&
              dirtyFields["name"] &&
              editUser["name"].length === 0 && {
                error: editUser.name.trim() === "",
                helperText: editUser.name.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["name"] && {
                error: true,
                helperText: error.data.error["name"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="select-role-label">Role</InputLabel>
          <Select
            required={true}
            labelId="select-role-label"
            id="select-role"
            name="role"
            label="Role"
            value={editUser?.role || ""}
            onChange={handleOnChangeText}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.keys(ROLES).map((key) => (
              <MenuItem key={key} value={key}>
                {ROLES[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
              dirtyFields["team_name"] &&
              editUser["team_name"].length === 0 && {
                error: editUser.team_name.trim() === "",
                helperText:
                  editUser.team_name.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["team_name"] && {
                error: true,
                helperText: error.data.error["team_name"],
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
