import { useRouter } from "next/router";

const Auth = () => {
  const router = useRouter();

  router.push("/auth/signin");
};

export default Auth;
