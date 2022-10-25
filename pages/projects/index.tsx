import ProjectsList from "@/features/projects/ProjectsList"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { Box } from "@mui/system"
import Link from "next/link"

const Project = () => {
  return (
    <Box display={"flex"} flexDirection="column">
      <Box ml={"auto"}>
        <Link href="/projects/new">
          <AddBoxIcon fontSize="large" />
        </Link>
      </Box>
      <ProjectsList />
    </Box>
  )
}

export default Project
