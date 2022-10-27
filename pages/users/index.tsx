import Search from "@/components/Search/Search"
import UsersList from "@/features/users/UsersList"
import { Button, Collapse, IconButton, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Drawer from "@mui/material/Drawer"
import Divider from "@mui/material/Divider"

import { FormEvent, useState } from "react"
import Container from "@mui/material/Container"
import { GridSearchIcon } from "@mui/x-data-grid"

type typeFormData = {
  projectName?: string
  employeeName?: string
  employeeId?: string
  role?: string
}

const User = () => {
  const [formData, setFormData] = useState<typeFormData | object>({})
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

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

    // call search api with query
    console.log("event: ", event)
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setIsSearchOpen(open)
    }

  return (
    <Container>
      <Stack direction={"column"}>
        <Box ml={"auto"} my={2}>
          <IconButton color={"info"} onClick={toggleDrawer(true)}>
            <GridSearchIcon />
          </IconButton>
        </Box>
        <Drawer
          anchor={"top"}
          open={isSearchOpen}
          onClose={toggleDrawer(false)}
        >
          <Search
            onChangeText={handleSearchInput}
            autoCompleteOnChange={handleAutoCompleteInput}
            onSubmit={handleOnSubmit}
          />
        </Drawer>
        <UsersList />
      </Stack>
    </Container>
  )
}

export default User
