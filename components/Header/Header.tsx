import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <Box sx={{ mb: 2 }} mb={4}>
      <AppBar position="static">
        <Toolbar>
          <Box className="cursor" display={"flex"} width="100%">
            <Link href="/">
              <Typography
                sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}
                variant="h6"
                component="div"
              >
                <GridViewOutlinedIcon />
                <Box ml={1}>LEAVEBOT ADMIN UI</Box>
              </Typography>
            </Link>
            {session && (
              <Box ml={"auto"}>
                <Link href="/">
                  <Typography variant="h6" component="div">
                    <Box ml={1} onClick={() => signOut()}>
                      logout
                    </Box>
                  </Typography>
                </Link>
              </Box>
            )}
          </Box>
          {/* <Button color="inherit">Login</Button>
          <LogoutIcon /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
