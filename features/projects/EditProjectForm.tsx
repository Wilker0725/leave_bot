import {
  selectProjectById,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "@/features/projects/projectsApiSlice"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import FormGroup from "@mui/material/FormGroup"
import { Dayjs } from "dayjs"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import DatePicker from "@/components/Inputs/DatePicker"
import SaveIcon from "@mui/icons-material/Save"
import DeleteIcon from "@mui/icons-material/Delete"
import Confirmation from "@/components/Modals/Confirmation/Alert/Confirmation"
import { DataNewProject } from "@/features/projects/types"

const EditProjectForm: FC<{ id: string }> = ({ id }) => {
  const router = useRouter()

  const project = useSelector((state) => selectProjectById(state, id))

  const [updateProject, { isLoading, isSuccess, isError, error }] =
    useUpdateProjectMutation()

  const [
    deleteProject,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteProjectMutation()

  const [editProject, setEditProject] = useState<DataNewProject | object>({})

  useEffect(() => {
    setEditProject(project)
  }, [project])

  const onSaveProject = async () => {
    try {
      await updateProject({
        id: project.id,
        ...editProject,
      })
      router.push("/projects")
    } catch (error) {}
  }

  const handleOnChangeText = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value }: { name: string; value?: string } = e.target
    setEditProject({ ...editProject, [name]: value })
  }

  const onDeleteProject = async () => {
    try {
      await deleteProject({
        id: project.id,
      })
      router.push("/projects")
    } catch (error) {}
  }

  const handleOnChangeStartDate = (value: Dayjs) => {
    setEditProject({ ...editProject, startDate: value })
  }

  const handleOnChangeEndDate = (value: Dayjs) => {
    setEditProject({ ...editProject, endDate: value })
  }

  if (!project) return <p>Loading</p>

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h5" component="h5" gutterBottom>
            {project.projectName}
          </Typography>
          <Box display={"flex"}>
            <SaveIcon
              fontSize="large"
              className="cursor"
              onClick={onSaveProject}
            />
            <Confirmation
              onClickYes={onDeleteProject}
              text={"Are you sure want to remove?"}
            >
              <DeleteIcon fontSize="large" className="cursor" />
            </Confirmation>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="projectName"
            name="projectName"
            label="Project Name"
            placeholder="Project Name"
            value={editProject?.projectName || ""}
            className=""
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="empName"
            name="empName"
            label="Employees"
            placeholder="Employees"
            value={editProject?.empName || ""}
            className=""
            onChange={handleOnChangeText}
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
            className=""
            onChange={handleOnChangeText}
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
            className=""
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <DatePicker
            value={editProject?.startDate || null}
            label={"Start Date"}
            onChange={handleOnChangeStartDate}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <DatePicker
            value={editProject?.endDate || null}
            label={"End Date"}
            onChange={handleOnChangeEndDate}
          />
        </FormGroup>
      </Grid>
    </Grid>
  )
}

export default EditProjectForm
