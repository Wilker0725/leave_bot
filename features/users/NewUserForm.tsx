import React, { useState, useEffect, useRef } from "react";
import { useAddNewUserMutation } from "@/features/users/usersApiSlice";
import { useRouter } from "next/router";
import SaveIcon from "@mui/icons-material/Save";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { User } from "@/features/users/types";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Toast from "@/components/Toast";
import { ROLES } from "@/config/roles";

const NewUserForm = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLDivElement>();
  const [addNewUser, { isLoading, isSuccess, isError, error }]: any =
    useAddNewUserMutation(undefined);

  const [newUser, setNewUser] = useState<Partial<User>>();
  const [dirtyFields, setDirtyFields] = useState({});

  useEffect(() => {
    if (isSuccess) router.push("/users");
  }, [isSuccess, router]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onCreateUser = async (e) => {
    e.preventDefault();

    try {
      const res: any = await addNewUser(newUser);

      if (res.data)
        Toast({ type: "success", message: "User successfully created." });
    } catch (error) {
      console.error("Create User Error: ", error);
      Toast({
        type: "error",
        message: "Something when wrong, unable to create user.",
      });
    }
  };

  const handleOnChangeText = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent
  ) => {
    const { name, value }: { name: string; value?: string } = e.target;

    // set dirty
    if (dirtyFields[name] === undefined)
      setDirtyFields({ ...dirtyFields, [name]: true });

    setNewUser({ ...newUser, [name]: value });
  };

  const content = (
    <Grid
      component={"form"}
      noValidate
      container
      spacing={2}
      mt={4}
      onSubmit={onCreateUser}
    >
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h5" component="h5" gutterBottom>
            Create New User
          </Typography>
          <Box display={"flex"}>
            <IconButton color="info" type="submit">
              <SaveIcon fontSize="large" className="cursor" />
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            inputRef={inputRef}
            required={true}
            id="cognizant_username"
            name="cognizant_username"
            label="Cognizant Username"
            placeholder="Cognizant Username"
            value={newUser?.cognizant_username || ""}
            onChange={handleOnChangeText}
            {...(newUser &&
              dirtyFields["cognizant_username"] && {
                error: newUser.cognizant_username.trim() === "",
                helperText:
                  newUser.cognizant_username.trim() === "" ? "Empty field" : "",
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
            value={newUser?.cognizant_user_id || ""}
            onChange={handleOnChangeText}
            {...(newUser &&
              dirtyFields["cognizant_user_id"] && {
                error: newUser.cognizant_user_id.trim() === "",
                helperText:
                  newUser.cognizant_user_id.trim() === "" ? "Empty field" : "",
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
            value={newUser?.first_name || ""}
            onChange={handleOnChangeText}
            {...(newUser &&
              dirtyFields["first_name"] && {
                error: newUser.first_name.trim() === "",
                helperText:
                  newUser.first_name.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["first_name"] && {
                error: true,
                helperText: error.data.error["first_name"],
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
            value={newUser?.last_name || ""}
            onChange={handleOnChangeText}
            {...(newUser &&
              dirtyFields["last_name"] && {
                error: newUser.last_name.trim() === "",
                helperText:
                  newUser.last_name.trim() === "" ? "Empty field" : "",
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
            value={newUser?.name || ""}
            onChange={handleOnChangeText}
            {...(newUser &&
              dirtyFields["name"] && {
                error: newUser.name.trim() === "",
                helperText: newUser.name.trim() === "" ? "Empty field" : "",
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl
          fullWidth
          {...(error &&
            error.data.error["role"] && {
              error,
            })}
        >
          <InputLabel id="Select-role-label">Role</InputLabel>
          <Select
            required={true}
            autoComplete="nope"
            labelId="select-role-label"
            id="select-role"
            name="role"
            label="Role"
            value={newUser?.role || ""}
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
          {error && error.data.error["role"] ? (
            <FormHelperText>{error.data.error["role"]}</FormHelperText>
          ) : null}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            id="telegram_ref_id"
            name="telegram_ref_id"
            label="Telegram Id"
            placeholder="Telegram Id"
            value={newUser?.telegram_ref_id || ""}
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
            value={newUser?.team_name || ""}
            onChange={handleOnChangeText}
            {...(newUser &&
              dirtyFields["team_name"] && {
                error: newUser.team_name.trim() === "",
                helperText:
                  newUser.team_name.trim() === "" ? "Empty field" : "",
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
            value={newUser?.account_name || ""}
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
            value={newUser?.title || ""}
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );

  return content;
};

export default NewUserForm;
