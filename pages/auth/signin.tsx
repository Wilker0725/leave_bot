import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

const theme = createTheme();

const SignIn = () => {
  const router = useRouter();

  const [pageState, setPageState] = useState({
    error: "",
    processing: false,
  });

  const simplifyError = (error) => {
    return error.length > 0 ? error : "Unknown error occurred";
  };

  async function submitHandler(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enteredEmail = data.get("email");
    const enteredPassword = data.get("password");

    setPageState((old) => ({ ...old, processing: true, error: "" }));

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      switch (result.error) {
        case "AccessDenied":
          // first time login, go to change password
          router.push({
            pathname: "/auth/change-password",
            query: { email: enteredEmail } as { email: string },
          });
          break;
        case "CredentialsSignin":
          throw "Invalid email or password";
      }

      if (result.status === 200 && result.ok) router.push("/");
    } catch (error) {
      setPageState((old) => ({
        ...old,
        processing: false,
        error,
      }));
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
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
            {pageState.error !== "" && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {simplifyError(pageState.error)}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
