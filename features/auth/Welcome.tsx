import { Box, Grid, Typography } from "@mui/material"
import Link from "next/link"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

const LinkStyles = {
  display: "flex",
  alignItems: "center",
}

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date)

  return (
    <Box>
      <Box component={"h3"}>Welcome!</Box>
      <Typography>{today}</Typography>
      <Grid mt={4}>
        <Grid item spacing={4}>
          <Typography>
            <Link href="/leaves">
              <a style={LinkStyles}>
                <ArrowRightAltIcon />
                View Leaves
              </a>
            </Link>
          </Typography>
        </Grid>
        <Grid item spacing={4}>
          <Typography>
            <Link href="/projects">
              <a style={LinkStyles}>
                <ArrowRightAltIcon />
                View Projects
              </a>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Welcome
