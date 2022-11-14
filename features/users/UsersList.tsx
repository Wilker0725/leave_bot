import { useAppDispatch } from "@/app/store";
import CustomizedTable from "@/components/Tables/CustomizedTable";
import User from "@/features/users/User";
import { useGetUsersQuery } from "@/features/users/usersApiSlice";
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
import { useSelector } from "react-redux";
import useSessionStorage from "@/hooks/useSessionStorage";
import { LinearProgress } from "@mui/material";
import Toast from "@/components/Toast";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const pageSearchQuery = useSelector(selectUserQuery);
  const pageSearch = useSelector(selectUserSearch);
  const page = useSelector(selectUserPage);
  const limit = useSelector(selectUserLimit);

  const [_, setSessionStorageUserQuery] = useSessionStorage(
    "user-query",
    pageSearchQuery
  );

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
  } = useGetUsersQuery(pageSearchQuery);

  useEffect(() => {
    const queryString = `page=${page + 1}&limit=${limit}&${pageSearch}`;

    dispatch(setUserPageQuery(queryString));

    setSessionStorageUserQuery(queryString);
  }, [page, limit, dispatch, pageSearch, setSessionStorageUserQuery]);

  let content = null;

  if (isLoading) content = <LinearProgress color="inherit" />;
  if (isError)
    Toast({
      type: "error",
      message: "Something when wrong, unable to retrieve users list.",
    });

  if (isSuccess) {
    let { ids, entities } = users;

    const pageInfo = entities["pageInfo"];

    content = (
      <CustomizedTable
        minWidth={600}
        headers={["Name", "Employee Id", "Role", "Team Name", "Action"]}
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
      </CustomizedTable>
    );

    return content;
  }
  return content;
};

export default UsersList;
