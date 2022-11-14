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
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import LockResetIcon from '@mui/icons-material/LockReset';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { useSession } from "next-auth/react";
import Welcome from '@/features/auth/Welcome';






const theme = createTheme();


const  ChangePassword = () => {
  // const emailInputRef = useRef();
  // const passwordInputRef = useRef();
  const [pageState, setPageState] = useState({
    error: '',
    processing: false
  });
  const  {data:session} = useSession();




  const router = useRouter();





  async function submitHandler(event) {
    event.preventDefault();
    setPageState(old => ({...old, processing: true, error: ''}))

        const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const reenterPassword = data.get('reenterpassword');

    if(password!==reenterPassword){
      setPageState(old => ({ ...old, processing: false, error: "Password enter does not match" }))
    }

    //    console.log({
    //     password: data.get('password'),
    //     reenterPassword: data.get('reenterpassword')

    // });
    const email = session.user.email;

    await axios.put("/api/admin/updateAdmin", {

      email:email,
      password:password
    });
    setPageState(old => ({ ...old, processing: false, error: "Password changes successfully..." }));


    router.push("./");
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
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Typography component="h5" variant="subtitle2">
            First Time Login User...Please change password
          </Typography>
          <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Enter Password"
              name="password"
              autoComplete="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="reenterpassword"
              label="Retype Password"
              type="reenterpassword"
              id="reenterpassword"
              autoComplete="current-password"
            />

{
                    pageState.error !== '' && <Alert severity='error' sx={{mb: 2}}>{(pageState.error)}</Alert>
                }

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>

          </Box>
        </Box>
       {/* // <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default ChangePassword;