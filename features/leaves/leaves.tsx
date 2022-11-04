import { FC } from "react";
import Link from "next/link";

import { useSelector } from "react-redux";
import { selectLeaveById } from "@/features/leaves/leavesApiSlice";
import {
  StyledTableCell,
  StyledTableRow,
} from "@/components/Tables/CustomizedTable";

const Leaves: FC<{ id: string }> = ({ id }) => {
  const leaves = useSelector((state) => {
    return selectLeaveById(state, id);
  });

  if (leaves) {
    return (
      <StyledTableRow>
        <StyledTableCell>{leaves.users.cognizant_id}</StyledTableCell>
        <StyledTableCell>{leaves.users.cognizant_username}</StyledTableCell>
        <StyledTableCell>{leaves.users.team_name}</StyledTableCell>
        <StyledTableCell>{leaves.leave_type}</StyledTableCell>
        <StyledTableCell>{leaves.start_date}</StyledTableCell>
        <StyledTableCell>{leaves.end_date}</StyledTableCell>
        <StyledTableCell align="right">
          <Link href={`/leaves/${id}`}></Link>
        </StyledTableCell>
      </StyledTableRow>
    );
  } else return null;
};
export default Leaves;
