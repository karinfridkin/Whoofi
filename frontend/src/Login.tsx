import { useState } from "react";
import { TextField, Button, Typography, Container, CssBaseline, Alert, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [email,setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({email: email,password:password});
    fetch(import.meta.env.VITE_API_URL + 'sign_in/',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
  }).then(res => {
    if (res.ok) {
      res.json().then((response) => localStorage.setItem('userType',response));
      localStorage.setItem("token", email ); // work on recieving token from server
      window.dispatchEvent(new Event('storage'));
      navigate('/search');
    }
    else {
      handleFailedLogin();
    }

  }).catch(handleFailedLogin)
  }

  const handleFailedLogin = () => {
    setLoginFailed(true);
    setTimeout(() => setLoginFailed(false), 2500);
  }

  return (
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
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginFailed && <Alert severity="error">Email or password incorrect</Alert>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <Button
          fullWidth
          variant="outlined"
          component={Link}
          to="/Signup"
          sx={{ mt: 1 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  </Container>
);
}

export default Login
