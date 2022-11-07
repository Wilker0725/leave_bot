import { useAppDispatch } from "@/app/store";
// import CustomizedTables from "@/components/Tables/CustomizedTable";
import CustomLeaveTable from "@/components/Tables/CustomLeaveTable";
import User from "@/features/users/User";
import { useGetUsersQuery } from "@/features/users/usersApiSlice";
import { useGetLeavesQuery } from "@/features/leaves/leavesApiSlice";
import { useEffect } from "react";
import {
  selectUserQuery,
  setUserPageQuery,
  selectUserSearch,
  selectUserPage,
  setUserPage,
  selectUserLimit,
  setUserPageLimit,
} from "@/features/users/userSlice";
import { setLeavesPageQuery } from "@/features/leaves/leavesSlice";
import { useSelector } from "react-redux";
import useSessionStorage from "@/hooks/useSessionStorage";

const LeavesList = () => {
  const dispatch = useAppDispatch();
  const pageSearchQuery = useSelector(selectUserQuery);
  const pageSearch = useSelector(selectUserSearch);
  const page = useSelector(selectUserPage);
  const limit = useSelector(selectUserLimit);

  const [_, setSessionStorageLeavesQuery] = useSessionStorage(
    "leaves-query",
    pageSearchQuery
  );

  const {
    data: leaves,
    isLoading,
    isSuccess,
    isError,
  } = useGetUsersQuery(pageSearchQuery);

  useEffect(() => {
    const queryString = `page=${page + 1}&limit=${limit}&${pageSearch}`;

    dispatch(setUserPageQuery(queryString));

    setSessionStorageLeavesQuery(queryString);
  }, [page, limit, dispatch, pageSearch, setSessionStorageLeavesQuery]);

  let content = null;

  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p>Error</p>;

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
          "Start Date",
          "End Date",
        ]}
        setPage={(value) => {
          dispatch(setUserPage(value));
        }}
        page={page}
        rowsPerPage={limit}
        setRowsPerPage={(value) => {
          dispatch(setUserPageLimit(value));
        }}
        totalPage={pageInfo.recordCount}
      >
        {ids?.length
          ? ids.map((id: string) => {
              if (id === "pageInfo") return null;

              return <User key={entities[id].id} user={entities[id]} />;
            })
          : null}
      </CustomLeaveTable>
    );

    return content;
  }
  return content;
};

export default LeavesList;
