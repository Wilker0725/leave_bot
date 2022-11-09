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
        <StyledTableCell>{project.project_name}</StyledTableCell>
        <StyledTableCell>{project.emp_id}</StyledTableCell>
        <StyledTableCell>{project.emp_name}</StyledTableCell>
        <StyledTableCell>{project.po_number}</StyledTableCell>
        <StyledTableCell>{project.so_number}</StyledTableCell>
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
