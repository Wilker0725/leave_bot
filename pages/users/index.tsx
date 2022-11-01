import Search from "@/components/Search/Search"
import UsersList from "@/features/users/UsersList"
import { Button, Collapse, IconButton, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Drawer from "@mui/material/Drawer"
import Divider from "@mui/material/Divider"

import { FormEvent, useState } from "react"
import Container from "@mui/material/Container"
import { GridSearchIcon } from "@mui/x-data-grid"
import { useAppDispatch } from "@/app/store"
import {
  setUserPageQuery,
  setUserSearch,
  selectUserSearch,
  resetQuery,
} from "@/features/users/userSlice"
import { objectToQuery } from "@/utils/queryTransform"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

type typeFormData = {
  projectName?: string
  employeeName?: string
  employeeId?: string
  role?: string
}

const User = () => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState<typeFormData | object>({})
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.id
    setFormData({ ...formData, [name]: event.target.value.trim() })
  }

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userQuery = objectToQuery(formData)

    dispatch(setUserSearch(userQuery))
    dispatch(setUserPageQuery(`page=1&limit=10&${userQuery}`))
    setIsSearch(true)

    // reset state
    setIsSearchOpen(false)
    setFormData({})
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
        <Stack direction={"row"} ml={"auto"} my={2}>
          <IconButton color={"info"} onClick={toggleDrawer(true)}>
            <GridSearchIcon />
          </IconButton>
          {isSearch ? (
            <IconButton
              color={"info"}
              style={{ paddingLeft: 0 }}
              onClick={() => {
                dispatch(resetQuery({}))
                setIsSearch(false)
              }}
            >
              <RestartAltIcon />
            </IconButton>
          ) : null}
        </Stack>
        <Drawer
          anchor={"top"}
          open={isSearchOpen}
          onClose={toggleDrawer(false)}
        >
          <Search onChangeText={handleSearchInput} onSubmit={handleOnSubmit} />
        </Drawer>
        <UsersList />
      </Stack>
    </Container>
  )
}

export default User
