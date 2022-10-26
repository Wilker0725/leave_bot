import { Box, Grid, Typography } from "@mui/material"
import Link from "next/link"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import RecipeReviewCard from "@/components/RecipeReviewCard"

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
      <Grid container mt={4} spacing={2}>
        <Grid item xs={12} md={4}>
          <Link href="/users" passHref>
            <RecipeReviewCard message={"View Users"}>
              <ArrowRightAltIcon />
            </RecipeReviewCard>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Link href="/projects" passHref>
            <RecipeReviewCard message={"View Projects"}>
              <ArrowRightAltIcon />
            </RecipeReviewCard>
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Welcome
