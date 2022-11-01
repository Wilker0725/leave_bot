import { FC } from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"
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
        <StyledTableCell>{user.name}</StyledTableCell>
        <StyledTableCell>{user.role}</StyledTableCell>
        <StyledTableCell>
          {user.is_active ? "Active" : "Inactive"}
        </StyledTableCell>
        <StyledTableCell>{user.team_name}</StyledTableCell>
        <StyledTableCell align="right">
          <Box display={"flex"} justifyContent="flex-end">
            <Box className="cursor">
              <Link href={`/users/${user.id}`}>
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
