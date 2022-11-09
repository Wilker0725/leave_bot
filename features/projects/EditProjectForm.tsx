import {
  getProjectSelectors,
  useDeleteProjectMutation,
  projectsApiSlice,
  useUpdateProjectMutation,
} from "@/features/projects/projectsApiSlice";
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
import { Project } from "@/features/projects/types";
import {
  selectProjectQuery,
  setProjectPageQuery,
} from "@/features/projects/projectSlice";
import { useAppDispatch } from "@/app/store";
import { IconButton, SelectChangeEvent } from "@mui/material";
import Toast from "@/components/Toast";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

const REQUIRED_FIELD = [
  "project_name",
  "emp_name",
  "emp_id",
  "po_number",
  "so_number",
  "start_date",
  "end_date",
];

const EditProjectForm = ({ id }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = useSelector(selectProjectQuery);
  const { selectById } = getProjectSelectors(query);

  useEffect(() => {
    const result = dispatch(
      projectsApiSlice.endpoints.getProjects.initiate(query)
    );
    dispatch(setProjectPageQuery(query));

    return result.unsubscribe;
  }, [dispatch, query]);

  const project = useSelector(selectById(id));

  const [updateProject, { isLoading, isSuccess, isError, error }]: any =
    useUpdateProjectMutation();

  const [
    deleteProject,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteProjectMutation();

  const [editProject, setEditProject] = useState<Partial<Project>>();
  const [dirtyFields, setDirtyFields] = useState({});

  useEffect(() => {
    if (project === undefined) return;

    const {
      project_name,
      emp_name,
      emp_id,
      po_number,
      so_number,
      start_date,
      end_date,
    } = project;

    setEditProject({
      project_name,
      emp_name,
      emp_id,
      po_number,
      so_number,
      start_date,
      end_date,
    });
  }, [project]);

  useEffect(() => {
    if (isSuccess) router.push("/projects");
  }, [isSuccess, router]);

  const onSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await updateProject({
        id: project.id,
        ...editProject,
      });

      if (res.data)
        Toast({
          type: "success",
          message: "Project details successfully updated.",
        });
    } catch (error) {
      console.error("Update Project Error: ", error);
      Toast({
        type: "error",
        message: "Something when wrong, unable to update project details.",
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

    setEditProject({ ...editProject, [name]: value });
  };

  const handleInChangeDate = (newValue: Dayjs | Date | null, name: string) => {
    setEditProject({
      ...editProject,
      [name]: dayjs(newValue).format(),
    });
  };

  const onDeleteProject = async () => {
    try {
      await deleteProject({
        id: project.id,
      });

      router.push("/projects");
      Toast({ type: "success", message: "Project successfuly deleted." });
    } catch (error) {
      console.error("Delete Project Error: ", error);
      Toast({
        type: "error",
        message: "Something when wrong, unable to deleted project.",
      });
    }
  };

  if (
    !project ||
    editProject === undefined ||
    Object.keys(editProject).length === 0
  )
    return <p>Loading</p>;

  let canSave = false;

  if (Object.keys(editProject).length > 0) {
    canSave =
      Object.entries(editProject)
        .filter(([key]) => REQUIRED_FIELD.includes(key))
        .every((item: any) => {
          if (item[1] === null || item[1] === "" || item[1] === undefined)
            return false;

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
      onSubmit={onSaveProject}
    >
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h5" component="h5" gutterBottom>
            {project.project_name}
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
              onClickYes={onDeleteProject}
              text={`Are you sure want to remove ${editProject?.project_name}?`}
            >
              <IconButton color="info">
                <DeleteIcon fontSize="large" className="cursor" />
              </IconButton>
            </Confirmation>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <FormGroup>
          <TextField
            required={true}
            id="project_name"
            name="project_name"
            label="Project Name"
            placeholder="Project Name"
            value={editProject?.project_name || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["project_name"] &&
              editProject["project_name"].length === 0 && {
                error: editProject.project_name.trim() === "",
                helperText:
                  editProject.project_name.trim() === "" ? "Empty field" : "",
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
            value={editProject?.emp_name || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["emp_name"] &&
              editProject["emp_name"].length === 0 && {
                error: editProject.emp_name.trim() === "",
                helperText:
                  editProject.emp_name.trim() === "" ? "Empty field" : "",
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
            value={editProject?.emp_id || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["emp_id"] &&
              editProject["emp_id"].length === 0 && {
                error: editProject.emp_id.trim() === "",
                helperText:
                  editProject.emp_id.trim() === "" ? "Empty field" : "",
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
            value={editProject?.po_number || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["po_number"] &&
              editProject["po_number"].length === 0 && {
                error: editProject.po_number.trim() === "",
                helperText:
                  editProject.po_number.trim() === "" ? "Empty field" : "",
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
            value={editProject?.so_number || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["so_number"] &&
              editProject["so_number"].length === 0 && {
                error: editProject.so_number.trim() === "",
                helperText:
                  editProject.so_number.trim() === "" ? "Empty field" : "",
              })}
            {...(error &&
              error.data.error["so_number"] && {
                error: true,
                helperText: error.data.error["so_number"],
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
              value={editProject?.start_date ? editProject.start_date : null}
              onChange={(value) => handleInChangeDate(value, "start_date")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={editProject?.end_date ? editProject.end_date : null}
              onChange={(value) => handleInChangeDate(value, "end_date")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </>
      </LocalizationProvider>
    </Grid>
  );
};

export default EditProjectForm;
