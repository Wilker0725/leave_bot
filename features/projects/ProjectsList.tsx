import CustomizedTables from "@/components/Tables/CustomizedTable"
import Project from "@/features/projects/Project"
import { useGetProjectsQuery } from "@/features/projects/projectsApiSlice"
import { useState } from "react"

const ProjectsList = () => {
  const [page, setPage] = useState(0)

  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    isFetching,
  } = useGetProjectsQuery(page)

  let content = null

  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>Error</p>
  if (isSuccess) {
    const { ids } = projects
    const tableContent = ids?.length
      ? ids.map((id: string) => {
          return <Project key={id} id={id} />
        })
      : null

    content = (
      <CustomizedTables
        headers={["Project Name", "Sales Number", "Employees", "Employee Id"]}
        ids={ids}
        page={page}
        setPage={setPage}
      >
        {tableContent}
      </CustomizedTables>
    )

    return content
  }

  return content
}

export default ProjectsList
