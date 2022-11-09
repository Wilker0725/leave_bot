import { useRouter } from "next/router";
import EditUserForm from "@/features/users/EditUserForm";
import { Container, LinearProgress } from "@mui/material";

const User: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <LinearProgress color="inherit" />;

  return (
    <Container>
      <EditUserForm id={id} />
    </Container>
  );
};

export default User;
