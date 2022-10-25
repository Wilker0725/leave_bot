import { FC } from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"
import Link from "next/link"

import { useSelector } from "react-redux"
import { selectProjectById } from "@/features/projects/projectsApiSlice"
import {
  StyledTableCell,
  StyledTableRow,
} from "@/components/Tables/CustomizedTable"

const Project: FC<{ id: string }> = ({ id }) => {
  const project = useSelector((state) => {
    return selectProjectById(state, id)
  })

  if (project) {
    return (
      <StyledTableRow>
        <StyledTableCell>{project.projectName}</StyledTableCell>
        <StyledTableCell>{project.salesOrderNumber}</StyledTableCell>
        <StyledTableCell>{project.empName}</StyledTableCell>
        <StyledTableCell>{project.empId}</StyledTableCell>
        <StyledTableCell align="right">
          <Link href={`/projects/${id}`}>
            <VisibilityIcon />
          </Link>
        </StyledTableCell>
      </StyledTableRow>
    )
  } else return null
}
export default Project
