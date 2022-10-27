import Link from "next/link"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload"
import LogoutIcon from "@mui/icons-material/Logout"

const Header = () => {
  return (
    <Box sx={{ mb: 2 }} mb={4}>
      <AppBar position="static">
        <Toolbar>
          <Box className="cursor">
            <Link href="/">
              <Typography
                sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}
                variant="h6"
                component="div"
              >
                <AssuredWorkloadIcon />
                <Box ml={1}>Dashboard</Box>
              </Typography>
            </Link>
          </Box>
          {/* <Button color="inherit">Login</Button>
          <LogoutIcon /> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
