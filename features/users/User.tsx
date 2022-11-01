import { FC } from "react"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import Link from "next/link"
import {
  StyledTableCell,
  StyledTableRow,
} from "@/components/Tables/CustomizedTable"
import { Box } from "@mui/material"

const User: FC<{ user: any }> = ({ user }) => {
  if (user) {
    return (
      <StyledTableRow>
        <StyledTableCell>{user.cognizant_username}</StyledTableCell>
        <StyledTableCell>{user.cognizant_user_id}</StyledTableCell>
        <StyledTableCell>{user.role}</StyledTableCell>
        <StyledTableCell>{user.team_name}</StyledTableCell>
        <StyledTableCell align="right">
          <Box display={"flex"} justifyContent="flex-end">
            <Box className="cursor">
              <Link href={`/users/${user.id}`}>
                <ModeEditIcon />
              </Link>
            </Box>
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    )
  } else return null
}
export default User
