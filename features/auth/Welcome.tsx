import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import RecipeReviewCard from "@/components/RecipeReviewCard";
import GroupIcon from "@mui/icons-material/Group";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import { useSession } from "next-auth/react"
import ChangePassword from "@/components/Changepassword/Changepassword";


const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date);

  const { data: session } = useSession()
  const  {data:token,status} = useSession();

  //console.log(session);
  console.log(token);

  if(session && token.user.authorized ==false){
    return (
      <Box display={"flex"} flexDirection="column">
        <ChangePassword />
      </Box>
    )

  }

  if(session){
    return (
      <Container>
      <Box component={"h3"}>Welcome { session.user.name }! </Box>
      <Typography>{today}</Typography>
      <Grid container mt={4} spacing={2}>
        <Grid item xs={12} md={4}>
          <Link href="/users" passHref>
            <RecipeReviewCard message={"View Users"}>
              <GroupIcon fontSize="large" />
            </RecipeReviewCard>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Link href="/leaves" passHref>
            <RecipeReviewCard message={"View Leaves"}>
              <HotelOutlinedIcon fontSize="large" />
            </RecipeReviewCard>
          </Link>
        </Grid>
      </Grid>
    </Container>
    );

  }
  
};

export default Welcome;
