import Welcome from "@/features/auth/Welcome"
import Login from "@/components/Login"
import ChangePassword from "@/components/Changepassword/Changepassword"
import { Box } from "@mui/system"
import { useSession } from "next-auth/react"

const App = () => {
  const { data: session } = useSession();
  const { data: token } = useSession();



if (!session){
  return (
    <Box display={"flex"} flexDirection="column">
      <Login />
    </Box>
  )
}
else{
  return (
    <Box display={"flex"} flexDirection="column">
      <Welcome />
    </Box>
  );
};

}

export default App
