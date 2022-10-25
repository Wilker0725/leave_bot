import { Box, Typography } from "@mui/material"
import Link from "next/link"

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date)

  return (
    <Box>
      <Box component={"h3"} mb={4}>
        Welcome!
      </Box>
      <Typography mb={2}>{today}</Typography>
      <Typography>
        <Link href="/projects">View Projects</Link>
      </Typography>
    </Box>
  )
}

export default Welcome
