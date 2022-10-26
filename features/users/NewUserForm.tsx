import React, { useState, useEffect } from "react"
import { useAddNewUserMutation } from "@/features/users/usersApiSlice"
import { useRouter } from "next/router"
import SaveIcon from "@mui/icons-material/Save"
import FormGroup from "@mui/material/FormGroup"
import { Dayjs } from "dayjs"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import DatePicker from "@/components/Inputs/DatePicker"
import { TypeUser } from "@/features/users/types"

const NewUserForm = () => {
  const router = useRouter()

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation(undefined)

  const [newUser, setNewUser] = useState<TypeUser | object>({})

  const [startDate, setStartDate] = useState<Dayjs | null>()
  const [endDate, setEndDate] = useState<Dayjs | null>()

  useEffect(() => {
    if (isSuccess) {
      router.push("/users")
    }
  }, [isSuccess, router])

  const canSave = [true].every(Boolean) && !isLoading

  const onCreateUser = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ ...newUser, startDate, endDate })
    }
  }

  const handleOnChangeText = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value }: { name: string; value?: string } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleOnChangeStartDate = (value: Dayjs) => {
    setStartDate(value)
  }
  const handleOnChangeEndDate = (value: Dayjs) => {
    setEndDate(value)
  }

  const content = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display={"flex"} alignContent="center">
          <Typography variant="h5" component="h5" gutterBottom>
            Create new User
          </Typography>
          <Box ml="auto">
            <SaveIcon
              fontSize="large"
              className="cursor"
              onClick={onCreateUser}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="userName"
            name="userName"
            label="User Name"
            placeholder="User Name"
            value={newUser?.name || ""}
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
            value={newUser?.empName || ""}
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
            value={newUser?.purchaseOrderNumber || ""}
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
            value={newUser?.salesOrderNumber || ""}
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

export default NewUserForm
