import { FC } from "react";
import Link from "next/link";
import moment from "moment";

import { useSelector } from "react-redux";
import {
  StyledTableCell,
  StyledTableRow,
} from "@/components/Tables/CustomLeaveTable";

const Leaves: FC<{ leave: any }> = ({ leave }) => {
  // console.log(leave);
  // const leaves = useSelector((state) => {
  //   return selectLeaveById(state, leave.id);
  // });
  if (leave) {
    return (
      <StyledTableRow>
        <StyledTableCell>{leave.users.cognizant_username}</StyledTableCell>
        <StyledTableCell>{leave.users.cognizant_user_id}</StyledTableCell>
        <StyledTableCell>{leave.users.team_name}</StyledTableCell>
        <StyledTableCell>{leave.leave_type}</StyledTableCell>
        <StyledTableCell>{leave.start_date}</StyledTableCell>
        <StyledTableCell>{leave.end_date}</StyledTableCell>
      </StyledTableRow>
    );
  } else return null;
};

export default Leaves;
