import { FC } from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"
import Link from "next/link"

import { useSelector } from "react-redux"
import { selectUserById } from "@/features/users/usersApiSlice"
import {
  StyledTableCell,
  StyledTableRow,
} from "@/components/Tables/CustomizedTable"
import { TypeUser } from "@/features/users/types"
import { Box } from "@mui/material"

const User: FC<{ id: string }> = ({ id }) => {
  const user: TypeUser = useSelector((state) => {
    return selectUserById(state, id)
  })
  console.log("user: ", user)
  if (user) {
    return (
      <StyledTableRow>
        <StyledTableCell>{user.name}</StyledTableCell>
        <StyledTableCell>{user.role}</StyledTableCell>
        <StyledTableCell>{user.is_active}</StyledTableCell>
        <StyledTableCell>{user.project_team_id}</StyledTableCell>
        <StyledTableCell align="right">
          <Box display={"flex"} justifyContent="flex-end">
            <Box className="cursor">
              <Link href={`/users/${id}`}>
                <VisibilityIcon />
              </Link>
            </Box>
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    )
  } else return null
}
export default User
