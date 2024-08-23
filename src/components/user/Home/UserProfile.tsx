import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import image from "../../../assets/bg_onliner3.jpeg";

const defaultTheme = createTheme();

export default function UserProfile() {
  const isSmallScreen = useMediaQuery(defaultTheme.breakpoints.down("sm"));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      email: data.get("email"),
      profilePhoto: data.get("profilePhoto"),
      about: data.get("about"),
      dob: data.get("dob"),
      address: data.get("address"),
      gender: data.get("gender"),
      languages: data.get("languages"),
      hobbies: data.get("hobbies"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", /* Center items vertically */
          alignItems: "center",
          p: 2, /* Add some padding */
          overflowY: "auto",
        }}
      >
        <CssBaseline />
        <Box
       
          sx={{
            marginTop: 8,
            width: isSmallScreen ? "90%" : "500px", /* Adjust width based on screen size */
            // maxHeight: "90vh", /* Ensure the box doesn't exceed the viewport height */
            backgroundColor: "rgba(256, 256, 256, 0.8)",
            boxShadow: "0px 4px 50px rgba(0,0,0, 0.6)",
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
             /* Enable scrolling if content overflows */
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100, mb: 2 }}
            alt="Profile Photo"
            src="" // Profile photo URL here
          />
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="profilePhoto"
                  label="Profile Photo URL"
                  name="profilePhoto"
                  autoComplete="profilePhoto"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="about"
                  label="About"
                  name="about"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="languages"
                  label="Languages"
                  name="languages"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="hobbies"
                  label="Hobbies"
                  name="hobbies"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#D3A221" }}
            >
              Save Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
