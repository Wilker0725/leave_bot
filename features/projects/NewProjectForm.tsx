import React, { useState, useEffect, useRef } from "react";
import { useAddNewProjectMutation } from "@/features/projects/projectsApiSlice";
import { useRouter } from "next/router";
import SaveIcon from "@mui/icons-material/Save";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Project } from "@/features/projects/types";
import { IconButton, SelectChangeEvent } from "@mui/material";
import Toast from "@/components/Toast";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

const NewProjectForm = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLDivElement>();
  const [addNewProject, { isLoading, isSuccess, isError, error }]: any =
    useAddNewProjectMutation(undefined);

  const [newProject, setNewProject] = useState<Partial<Project>>();
  const [dirtyFields, setDirtyFields] = useState({});

  useEffect(() => {
    if (isSuccess) router.push("/projects");
  }, [isSuccess, router]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onCreateProject = async (e) => {
    e.preventDefault();

    try {
      const res: any = await addNewProject(newProject);

      if (res.data)
        Toast({ type: "success", message: "Project successfully created." });
    } catch (error) {
      console.error("Create Project Error: ", error);
      Toast({
        type: "error",
        message: "Something when wrong, unable to create project.",
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

    setNewProject({ ...newProject, [name]: value });
  };

  const handleInChangeDate = (newValue: Dayjs | Date | null, name: string) => {
    setNewProject({
      ...newProject,
      [name]: dayjs(newValue).format(),
    });
  };

  const content = (
    <Grid
      component={"form"}
      noValidate
      container
      spacing={2}
      mt={4}
      onSubmit={onCreateProject}
    >
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h5" component="h5" gutterBottom>
            Create New Project
          </Typography>
          <Box display={"flex"}>
            <IconButton color="info" type="submit">
              <SaveIcon fontSize="large" className="cursor" />
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <FormGroup>
          <TextField
            inputRef={inputRef}
            required={true}
            id="project_name"
            name="project_name"
            label="Project Name"
            placeholder="Project Name"
            value={newProject?.project_name || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["project_name"] && {
                error: newProject.project_name.trim() === "",
                helperText:
                  newProject.project_name.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["project_name"] && {
                error: true,
                helperText: error.data.error["project_name"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="emp_name"
            name="emp_name"
            label="Employee Name"
            placeholder="Employee Name"
            value={newProject?.emp_name || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["emp_name"] && {
                error: newProject.emp_name.trim() === "",
                helperText:
                  newProject.emp_name.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["emp_name"] && {
                error: true,
                helperText: error.data.error["emp_name"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="emp_id"
            name="emp_id"
            label="Employee Id"
            placeholder="Employee Id"
            value={newProject?.emp_id || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["emp_id"] && {
                error: newProject.emp_id.trim() === "",
                helperText:
                  newProject.emp_id.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["emp_id"] && {
                error: true,
                helperText: error.data.error["emp_id"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="po_number"
            name="po_number"
            label="Purchase Order Number"
            placeholder="Purchase Order Number"
            value={newProject?.po_number || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["po_number"] && {
                error: newProject.po_number.trim() === "",
                helperText:
                  newProject.po_number.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["po_number"] && {
                error: true,
                helperText: error.data.error["po_number"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="so_number"
            name="so_number"
            label="Sales Order Number"
            placeholder="Sales Order Number"
            value={newProject?.so_number || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["so_number"] && {
                error: newProject.so_number.trim() === "",
                helperText:
                  newProject.so_number.trim() === "" ? "Empty field" : "",
              })}
          />
        </FormGroup>
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <>
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="MM/DD/YYYY"
              value={newProject?.start_date ? newProject.start_date : null}
              onChange={(value) => handleInChangeDate(value, "start_date")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={newProject?.end_date ? newProject.end_date : null}
              onChange={(value) => handleInChangeDate(value, "end_date")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </>
      </LocalizationProvider>
    </Grid>
  );

  return content;
};

export default NewProjectForm;
