import {
  selectUserById,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/features/users/usersApiSlice"
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
import { TypeUser } from "@/features/users/types"

const EditUserForm: FC<{ id: string }> = ({ id }) => {
  const router = useRouter()

  const user: TypeUser = useSelector((state) => selectUserById(state, id))

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation()

  const [editUser, setEditUser] = useState<TypeUser | any>({})

  useEffect(() => {
    setEditUser(user)
  }, [user])

  const onSaveUser = async () => {
    try {
      await updateUser({
        id: user.id,
        ...editUser,
      })
      router.push("/users")
    } catch (error) {}
  }

  const handleOnChangeText = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value }: { name: string; value?: string } = e.target
    setEditUser({ ...editUser, [name]: value })
  }

  const onDeleteUser = async () => {
    try {
      await deleteUser({
        id: user.id,
      })
      router.push("/users")
    } catch (error) {}
  }

  if (!user) return <p>Loading</p>

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h5" component="h5" gutterBottom>
            {user.name}
          </Typography>
          <Box display={"flex"}>
            <SaveIcon
              fontSize="large"
              className="cursor"
              onClick={onSaveUser}
            />
            <Confirmation
              onClickYes={onDeleteUser}
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
            id="userName"
            name="userName"
            label="User Name"
            placeholder="User Name"
            value={editUser?.name || ""}
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="title"
            name="title"
            label="Title"
            placeholder="Title"
            value={editUser?.title || ""}
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
            value={editUser?.role || ""}
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <TextField
            required={true}
            id="is_active"
            name="is_active"
            label="Active"
            placeholder="Active"
            value={editUser?.is_active || ""}
            onChange={handleOnChangeText}
          />
        </FormGroup>
      </Grid>
    </Grid>
  )
}

export default EditUserForm
