import Search from "@/components/Search/Search"
import UsersList from "@/features/users/UsersList"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Link from "next/link"
import { FormEvent, useState } from "react"

type typeFormData = {
  projectName?: string
  employeeName?: string
  employeeId?: string
  role?: string
}

const Leave = () => {
  const [formData, setFormData] = useState<typeFormData | object>({})

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.id.split("-")[0]
    setFormData({ ...formData, [name]: event.target.value })
  }

  const handleAutoCompleteInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string
  ) => {
    const name = event.target.id.split("-")[0]
    setFormData({ ...formData, [name]: newValue })
  }

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // call search api
    console.log("event: ", event)
  }

  return (
    <Box display={"flex"} flexDirection="column">
      <Search
        // open={open}
        onChangeText={handleSearchInput}
        autoCompleteOnChange={handleAutoCompleteInput}
        onSubmit={handleOnSubmit}
      />
      {/* <Box ml={"auto"} mb={2}>
        <Link href="/users/new">
          <Button variant="outlined">
            <Typography mr="6px">Create new Leave</Typography>
            <AddBoxIcon fontSize="medium" />
          </Button>
        </Link>
      </Box> */}
      <UsersList />
    </Box>
  )
}

export default Leave
