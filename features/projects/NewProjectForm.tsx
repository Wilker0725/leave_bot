import React, { useState, useEffect } from "react"
import { useAddNewProjectMutation } from "@/features/projects/projectsApiSlice"
import { useRouter } from "next/router"
import SaveIcon from "@mui/icons-material/Save"
import FormGroup from "@mui/material/FormGroup"
import { Dayjs } from "dayjs"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import DatePicker from "@/components/Inputs/DatePicker"
import { DataNewProject } from "@/features/projects/types"

const NewProjectForm = () => {
  const router = useRouter()

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewProjectMutation(undefined)

  const [newProject, setNewProject] = useState<DataNewProject | object>({})

  const [startDate, setStartDate] = useState<Dayjs | null>()
  const [endDate, setEndDate] = useState<Dayjs | null>()

  useEffect(() => {
    if (isSuccess) {
      router.push("/projects")
    }
  }, [isSuccess, router])

  const canSave = [true].every(Boolean) && !isLoading

  const onCreateProject = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ ...newProject, startDate, endDate })
    }
  }

  const handleOnChangeText = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value }: { name: string; value?: string } = e.target
    setNewProject({ ...newProject, [name]: value })
  }

  const handleOnChangeStartDate = (value: Dayjs) => {
    setStartDate(value)
  }
  const handleOnChangeEndDate = (value: Dayjs) => {
    setEndDate(value)
  }

  const errClass = isError ? "errmsg" : "offscreen"

  const content = (
    <Grid container spacing={2}>
      {/* <p className={errClass}>{error?.data?.message}</p> */}
      <Grid item xs={12}>
        <Box display={"flex"} alignContent="center">
          <Typography variant="h5" component="h5" gutterBottom>
            Create new Project
          </Typography>
          <Box ml="auto">
            <SaveIcon
              fontSize="large"
              className="cursor"
              onClick={onCreateProject}
            />
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
            value={newProject?.projectName || ""}
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
            value={newProject?.empName || ""}
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
            value={newProject?.purchaseOrderNumber || ""}
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
            value={newProject?.salesOrderNumber || ""}
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <DatePicker
            value={startDate || null}
            label={"Start Date"}
            onChange={handleOnChangeStartDate}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <DatePicker
            value={endDate || null}
            label={"End Date"}
            onChange={handleOnChangeEndDate}
          />
        </FormGroup>
      </Grid>
    </Grid>
  )

  return content
}

export default NewProjectForm
