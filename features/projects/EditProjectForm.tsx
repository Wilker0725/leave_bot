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
  "projectName",
  "empName",
  "empId",
  "purchaseOrderNumber",
  "salesOrderNumber",
  "startDate",
  "endDate",
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
      projectName,
      empName,
      empId,
      purchaseOrderNumber,
      salesOrderNumber,
      startDate,
      endDate,
    } = project;

    setEditProject({
      projectName,
      empName,
      empId,
      purchaseOrderNumber,
      salesOrderNumber,
      startDate,
      endDate,
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
      onSubmit={onSaveProject}
    >
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h5" component="h5" gutterBottom>
            {project.projectName}
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
              text={`Are you sure want to remove ${editProject?.projectName}?`}
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
            id="projectName"
            name="projectName"
            label="Project Name"
            placeholder="Project Name"
            value={editProject?.projectName || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["projectName"] &&
              editProject["projectName"].length === 0 && {
                error: editProject.projectName.trim() === "",
                helperText:
                  editProject.projectName.trim() === "" ? "Empty field" : "",
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
            label="Employee Name"
            placeholder="Employee Name"
            value={editProject?.empName || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["empName"] &&
              editProject["empName"].length === 0 && {
                error: editProject.empName.trim() === "",
                helperText:
                  editProject.empName.trim() === "" ? "Empty field" : "",
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
            value={editProject?.empId || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["empId"] &&
              editProject["empId"].length === 0 && {
                error: editProject.empId.trim() === "",
                helperText:
                  editProject.empId.trim() === "" ? "Empty field" : "",
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
            value={editProject?.purchaseOrderNumber || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["purchaseOrderNumber"] &&
              editProject["purchaseOrderNumber"].length === 0 && {
                error: editProject.purchaseOrderNumber.trim() === "",
                helperText:
                  editProject.purchaseOrderNumber.trim() === ""
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
            value={editProject?.salesOrderNumber || ""}
            onChange={handleOnChangeText}
            {...(editProject &&
              dirtyFields["salesOrderNumber"] &&
              editProject["salesOrderNumber"].length === 0 && {
                error: editProject.salesOrderNumber.trim() === "",
                helperText:
                  editProject.salesOrderNumber.trim() === ""
                    ? "Empty field"
                    : "",
              })}
            {...(error &&
              error.data.error["salesOrderNumber"] && {
                error: true,
                helperText: error.data.error["salesOrderNumber"],
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
              value={editProject?.startDate ? editProject.startDate : null}
              onChange={(value) => handleInChangeDate(value, "startDate")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={editProject?.endDate ? editProject.endDate : null}
              onChange={(value) => handleInChangeDate(value, "endDate")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </>
      </LocalizationProvider>
    </Grid>
  );
};

export default EditProjectForm;
