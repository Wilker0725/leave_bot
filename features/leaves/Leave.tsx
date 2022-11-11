import { FC } from "react";

import {
  StyledTableCell,
  StyledTableRow,
} from "@/components/Tables/CustomLeaveTable";
import dayjs from "dayjs";

const Leave: FC<{ leave: any }> = ({ leave }) => {
  if (leave) {
    return (
      <StyledTableRow>
        <StyledTableCell>{leave.users.cognizant_username}</StyledTableCell>
        <StyledTableCell>{leave.users.cognizant_user_id}</StyledTableCell>
        <StyledTableCell>{leave.users.team_name}</StyledTableCell>
        <StyledTableCell>{leave.leave_type}</StyledTableCell>
        <StyledTableCell>{leave.partial_days}</StyledTableCell>
        <StyledTableCell>
          {dayjs(leave.start_date).format("YYYY/MM/DD hh:mm:ss A")}
        </StyledTableCell>
        <StyledTableCell>
          {dayjs(leave.end_date).format("YYYY/MM/DD hh:mm:ss A")}
        </StyledTableCell>
      </StyledTableRow>
    );
  } else return null;
};

export default Leave;
