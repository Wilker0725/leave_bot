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
            id="projectName"
            name="projectName"
            label="Project Name"
            placeholder="Project Name"
            value={newProject?.projectName || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["projectName"] && {
                error: newProject.projectName.trim() === "",
                helperText:
                  newProject.projectName.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["projectName"] && {
                error: true,
                helperText: error.data.error["projectName"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="empName"
            name="empName"
            label="empName"
            placeholder="empName"
            value={newProject?.empName || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["empName"] && {
                error: newProject.empName.trim() === "",
                helperText:
                  newProject.empName.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["empName"] && {
                error: true,
                helperText: error.data.error["empName"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="empId"
            name="empId"
            label="Employee Id"
            placeholder="Employee Id"
            value={newProject?.empId || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["empId"] && {
                error: newProject.empId.trim() === "",
                helperText: newProject.empId.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["empId"] && {
                error: true,
                helperText: error.data.error["empId"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="purchaseOrderNumber"
            name="purchaseOrderNumber"
            label="Purchase Order Number"
            placeholder="Purchase Order Number"
            value={newProject?.purchaseOrderNumber || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["purchaseOrderNumber"] && {
                error: newProject.purchaseOrderNumber.trim() === "",
                helperText:
                  newProject.purchaseOrderNumber.trim() === ""
                    ? "Empty field"
                    : "",
              })}
            {...(error &&
              error.data.error["purchaseOrderNumber"] && {
                error: true,
                helperText: error.data.error["purchaseOrderNumber"],
              })}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="salesOrderNumber"
            name="salesOrderNumber"
            label="Sales Order Number"
            placeholder="Sales Order Number"
            value={newProject?.salesOrderNumber || ""}
            onChange={handleOnChangeText}
            {...(newProject &&
              dirtyFields["salesOrderNumber"] && {
                error: newProject.salesOrderNumber.trim() === "",
                helperText:
                  newProject.salesOrderNumber.trim() === ""
                    ? "Empty field"
                    : "",
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
              value={newProject?.startDate ? newProject.startDate : null}
              onChange={(value) => handleInChangeDate(value, "startDate")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={newProject?.endDate ? newProject.endDate : null}
              onChange={(value) => handleInChangeDate(value, "endDate")}
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
