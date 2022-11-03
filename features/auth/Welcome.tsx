import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import RecipeReviewCard from "@/components/RecipeReviewCard";
import GroupIcon from "@mui/icons-material/Group";
import VaccinesIcon from "@mui/icons-material/Vaccines";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date);

  return (
    <Container>
      <Box component={"h3"}>Welcome!</Box>
      <Typography>{today}</Typography>
      <Grid container mt={4} spacing={2}>
        <Grid item xs={12} md={4}>
          <Link href="/users" passHref>
            <RecipeReviewCard message={"View Users"}>
              <GroupIcon fontSize="large" />
            </RecipeReviewCard>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Welcome;
