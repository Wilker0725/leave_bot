import { FC } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Link from "next/link";
import {
  StyledTableCell,
  StyledTableRow,
} from "@/components/Tables/CustomizedTable";
import { Box } from "@mui/material";
import { Project } from "./types";

const Project: FC<{ project: Project }> = ({ project }) => {
  if (project) {
    return (
      <StyledTableRow>
        <StyledTableCell>{project.projectName}</StyledTableCell>
        <StyledTableCell>{project.empId}</StyledTableCell>
        <StyledTableCell>{project.empName}</StyledTableCell>
        <StyledTableCell align="right">
          <Box display={"flex"} justifyContent="flex-end">
            <Box className="cursor">
              <Link href={`/projects/${project.id}`}>
                <ModeEditIcon />
              </Link>
            </Box>
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    );
  } else return null;
};
export default Project;
