import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import image from '../../../assets/bg_onliner3.jpeg'
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [errors, setErrors] = React.useState<{ username?: string; email?: string; password?: string; gender?: string; language?: string }>({});
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(defaultTheme.breakpoints.down('sm'));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formErrors: { username?: string; email?: string; password?: string; gender?: string; language?: string } = {};

    // Validate username
    if (!username) {
      formErrors.username = "Username is required";
    }

    // Validate email
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
    }

    // Validate password
    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    // Validate gender
    if (!gender) {
      formErrors.gender = "Gender is required";
    }

    // Validate language
    if (!language) {
      formErrors.language = "Preferred Language is required";
    }

    // Set errors state 
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

  
    console.log({
      username,
      email,
      password,
      gender,
      language,
    });

    // Clear errors if validation passes
    setErrors({});
  };

  const signin = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: isSmallScreen ? "cover" : "cover",
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity here
            zIndex: 1
          },
          '& > *': {
            position: 'relative',
            zIndex: 2
          },
          height: '100vh',
          width: '100vw',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow:"auto",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            width: isSmallScreen ? '90%' : '460px',
            backgroundColor: "rgba(256, 256, 256, 0.8)",
            boxShadow: 10,
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "#D3A221" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              error={!!errors.gender}
              helperText={errors.gender}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="language"
              label="Preferred Language"
              name="language"
              autoComplete="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              error={!!errors.language}
              helperText={errors.language}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#D3A221" }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={signin}
                  style={{ cursor: "pointer" }}
                >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
