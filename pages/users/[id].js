import { useRouter } from "next/router"
import EditUserForm from "@/features/users/EditUserForm"
import { Box } from "@mui/material"

const User = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return <p>loading..</p>

  return (
    <Box>
      <EditUserForm id={id} />
    </Box>
  )
}

export default User
