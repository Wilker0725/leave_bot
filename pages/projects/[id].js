import { useRouter } from "next/router"
import EditProjectForm from "@/features/projects/EditProjectForm"
import { Box } from "@mui/material"

const Project = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return <p>loading..</p>

  return (
    <Box>
      <EditProjectForm id={id} />
    </Box>
  )
}

export default Project
