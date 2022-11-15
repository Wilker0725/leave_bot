import Welcome from "@/features/auth/Welcome";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const App = ({ isAuth }) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { data: token } = useSession();

  console.log("session in index root: ", session);

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, router]);

    return (
      <Box display={"flex"} flexDirection="column">
        <Welcome />
      </Box>
};

export async function getServerSideProps(context) {
  const isAuth = context?.cookies
    ? context.cookies["next-auth.session-token"].length > 0
    : false;

  // console.log("context?.cookies", context.cookies);

  console.log("isAuth :>> ", isAuth);
  return {
    props: {
      isAuth,
    },
  };
}

export default App;
