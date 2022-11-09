import { useRouter } from "next/router";
import EditProjectForm from "@/features/projects/EditProjectForm";
import { Container, LinearProgress } from "@mui/material";

const Project: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <LinearProgress color="inherit" />;

  return (
    <Container>
      <EditProjectForm id={id} />
    </Container>
  );
};

export default Project;
