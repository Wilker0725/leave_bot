import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {signIn} from "next-auth/react";
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Alert} from '@mui/material'
import Welcome from '@/features/auth/Welcome';
import {
  getSession,
  useSession
} from 'next-auth/react'



const theme = createTheme();


const  SignIn = () => {


  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  //const { data: session, status } = useSession()
  const [pageState, setPageState] = useState({
    error: '',
    processing: false
})

const simplifyError = (error) => {
  const errorMap = {
      "CredentialsSignin": "Invalid username or password"
  }
  return errorMap[error] ?? "Unknown error occurred"
}





  async function submitHandler(event) {
    event.preventDefault();
        const data = new FormData(event.currentTarget);
    const enteredEmail = data.get('email');
    const enteredPassword = data.get('password');

       console.log({
      email: data.get('email'),
      password: data.get('password'),
    });


    // optional: Add validation

    if (isLogin) {
      setPageState(old => ({...old, processing: true, error: ''}))

      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      console.log(result);

      if (!result.error) {

        return (
          <Box display={"flex"} flexDirection="column">
            <Welcome />
          </Box>
        )

        // set some auth state
        //router.replace('/signin');
      }else{
          setPageState(old => ({ ...old, processing: false, error: result.error }))
      
      }

    } 
  }

  


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                            {
                    pageState.error !== '' && <Alert severity='error' sx={{mb: 2}}>{simplifyError(pageState.error)}</Alert>
                }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
       {/* // <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;