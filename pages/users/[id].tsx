import { useRouter } from "next/router"
import EditUserForm from "@/features/users/EditUserForm"
import { Container } from "@mui/material"

const User = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return <p>loading..</p>

  return (
    <Container>
      <EditUserForm id={id} />
    </Container>
  )
}

export default User
