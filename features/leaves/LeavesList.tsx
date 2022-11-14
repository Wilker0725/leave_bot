import { useAppDispatch } from "@/app/store";
import CustomLeaveTable from "@/components/Tables/CustomLeaveTable";
import Leaves from "@/features/leaves/Leave";
import { useGetLeavesQuery } from "@/features/leaves/leaveApiSlice";
import { useEffect } from "react";
import {
  selectLeaveQuery,
  setLeavePageQuery,
  selectLeaveSearch,
  selectLeavePage,
  setLeavePage,
  selectLeaveLimit,
  setLeavePageLimit,
} from "@/features/leaves/leaveSlice";
import { useSelector } from "react-redux";
import useSessionStorage from "@/hooks/useSessionStorage";
import { LinearProgress } from "@mui/material";
import Toast from "@/components/Toast";

const LeavesList = () => {
  const dispatch = useAppDispatch();
  const pageSearchQuery = useSelector(selectLeaveQuery);
  const pageSearch = useSelector(selectLeaveSearch);
  const page = useSelector(selectLeavePage);
  const limit = useSelector(selectLeaveLimit);

  const [_, setSessionStorageLeavesQuery] = useSessionStorage(
    "leave-query",
    pageSearchQuery
  );

  const {
    data: leaves,
    isLoading,
    isSuccess,
    isError,
  } = useGetLeavesQuery(pageSearchQuery);

  useEffect(() => {
    const queryString = `page=${page + 1}&limit=${limit}&${pageSearch}`;

    dispatch(setLeavePageQuery(queryString));

    setSessionStorageLeavesQuery(queryString);
  }, [page, limit, dispatch, pageSearch, setSessionStorageLeavesQuery]);

  let content = null;

  if (isLoading) content = <LinearProgress color="inherit" />;
  if (isError)
    Toast({
      type: "error",
      message: "Something when wrong, unable to retrieve leaves list.",
    });

  if (isSuccess) {
    let { ids, entities } = leaves;

    /**
        Walk around from apiSlice to pass pageInfo 
        Need to remove from here 
        - to remove the last item
     */
    const pageInfo = entities["pageInfo"];

    content = (
      <CustomLeaveTable
        minWidth={600}
        headers={[
          "Associate Name",
          "Cognizant ID",
          "Project Name",
          "Leave Type",
          "Partial Days",
          "Start Date",
          "End Date",
        ]}
        setPage={(value) => {
          dispatch(setLeavePage(value));
        }}
        page={page}
        rowsPerPage={limit}
        setRowsPerPage={(value) => {
          dispatch(setLeavePageLimit(value));
        }}
        totalPage={pageInfo.recordCount}
      >
        {ids?.length
          ? ids.map((id: string) => {
              if (id === "pageInfo") return null;

              // return <User key={entities[id].id} user={entities[id]} />;
              return <Leaves key={entities[id].id} leave={entities[id]} />;
            })
          : null}
      </CustomLeaveTable>
    );

    return content;
  }
  return content;
};

export default LeavesList;
