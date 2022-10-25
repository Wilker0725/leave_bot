import CustomizedTables from "@/components/Tables/CustomizedTable"
import Project from "@/features/projects/Project"
import { useGetProjectsQuery } from "@/features/projects/projectsApiSlice"

const ProjectsList = () => {
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
  } = useGetProjectsQuery(undefined)

  let content = null

  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>Error</p>
  if (isSuccess) {
    const { ids } = projects
    const tableContent = ids?.length
      ? ids.map((id) => {
          return <Project key={id} id={id} />
        })
      : null

    content = <CustomizedTables ids={ids}>{tableContent}</CustomizedTables>

    return content
  }
  return content
}

export default ProjectsList
