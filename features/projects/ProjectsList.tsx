import { useAppDispatch } from "@/app/store";
import CustomizedTables from "@/components/Tables/CustomizedTable";
import Project from "@/features/projects/Project";
import { useGetProjectsQuery } from "@/features/projects/projectsApiSlice";
import { useEffect } from "react";
import {
  selectProjectQuery,
  setProjectPageQuery,
  selectProjectSearch,
  selectProjectPage,
  setProjectPage,
  selectProjectLimit,
  setProjectPageLimit,
} from "@/features/projects/projectSlice";
import { useSelector } from "react-redux";
import useSessionStorage from "@/hooks/useSessionStorage";
import { LinearProgress } from "@mui/material";
import Toast from "@/components/Toast";

const ProjectsList = () => {
  const dispatch = useAppDispatch();
  const pageSearchQuery = useSelector(selectProjectQuery);
  const pageSearch = useSelector(selectProjectSearch);
  const page = useSelector(selectProjectPage);
  const limit = useSelector(selectProjectLimit);

  const [_, setSessionStorageProjectQuery] = useSessionStorage(
    "project-query",
    pageSearchQuery
  );

  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
  } = useGetProjectsQuery(pageSearchQuery);

  useEffect(() => {
    const queryString = `page=${page + 1}&limit=${limit}&${pageSearch}`;

    dispatch(setProjectPageQuery(queryString));

    setSessionStorageProjectQuery(queryString);
  }, [page, limit, dispatch, pageSearch, setSessionStorageProjectQuery]);

  let content = null;

  if (isLoading) content = <LinearProgress color="inherit" />;
  if (isError)
    Toast({
      type: "error",
      message: "Something when wrong, unable to retrieve projects list.",
    });

  if (isSuccess) {
    let { ids, entities } = projects;

    const pageInfo = entities["pageInfo"];

    content = (
      <CustomizedTables
        minWidth={600}
        headers={["Project Name", "Employee Id", "Employee Name"]}
        setPage={(value) => {
          dispatch(setProjectPage(value));
        }}
        page={page}
        rowsPerPage={limit}
        setRowsPerPage={(value) => {
          dispatch(setProjectPageLimit(value));
        }}
        totalPage={pageInfo.recordCount}
      >
        {ids?.length
          ? ids.map((id: string) => {
              if (id === "pageInfo") return null;

              return <Project key={entities[id].id} project={entities[id]} />;
            })
          : null}
      </CustomizedTables>
    );

    return content;
  }
  return content;
};

export default ProjectsList;
