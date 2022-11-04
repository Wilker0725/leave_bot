import React, { useState, useEffect } from "react";
import { useAddNewUserMutation } from "@/features/users/usersApiSlice";
import { useRouter } from "next/router";
import SaveIcon from "@mui/icons-material/Save";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { TypeUser } from "@/features/users/types";
import { IconButton } from "@mui/material";

const NewUserForm = () => {
  const router = useRouter();

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation(undefined);

  const [newUser, setNewUser] = useState<TypeUser | any>({});
  const [dirtyFields, setDirtyFields] = useState({});

  useEffect(() => {
    if (isSuccess) {
      router.push("/users");
    }
  }, [isSuccess, router]);

  const onCreateUser = async (e) => {
    e.preventDefault();

    await addNewUser(newUser);
  };

  const handleOnChangeText = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
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
        <FormGroup>
          <TextField
            required={true}
            id="role"
            name="role"
            label="Role"
            placeholder="Role"
            value={newUser?.role || ""}
            onChange={handleOnChangeText}
            {...(newUser &&
              dirtyFields["role"] && {
                error: newUser.role.trim() === "",
                helperText: newUser.role.trim() === "" ? "Empty field" : "",
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
