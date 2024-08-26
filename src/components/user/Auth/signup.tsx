import * as React from "react";
import axios from "axios";
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
import image from "../../../assets/bg_onliner3.jpeg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const defaultTheme = createTheme();

interface formData {
  username?: string;
  email?: string;
  password?: string;
  gender?: string;
  language?: string;
}

export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [errors, setErrors] = React.useState<formData>({
    username: "",
    email: "",
    password: "",
    gender: "",
    language: "",
  });

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(defaultTheme.breakpoints.down("sm"));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formErrors: formData = {};

    // Validate form fields
    if (!username) formErrors.username = "Username is required";
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
    }
    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }
    if (!gender) formErrors.gender = "Gender is required";
    if (!language) formErrors.language = "Preferred Language is required";

    // Set errors state if any errors found
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Prepare data to send in API request
    const data = {
      username,
      email,
      password,
      gender,
      language,
    };

    try {
      // Make POST request with Axios
      const result = await axios.post("http://localhost:4000/register", data);
      console.log(result.data);
      if (result.data.data.success) {
        toast.info("Verify your email");
        localStorage.setItem("otp", result.data.data.otp);
        navigate("/otp");
      } else {
        toast.error("email already found");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      if (axios.isAxiosError(error)) {
        console.log("isAxiosError :", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
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
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          },
          "& > *": {
            position: "relative",
            zIndex: 2,
          },
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            width: isSmallScreen ? "90%" : "460px",
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
