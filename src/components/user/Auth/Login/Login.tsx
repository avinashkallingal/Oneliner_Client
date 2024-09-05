import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import image from "../../../../Assets/bg_onliner3.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";
import Swalert from "sweetalert2";
import "./Login.css";

const defaultTheme = createTheme();

export default function SignIn() {
  useEffect(() => {
    const token = localStorage.getItem("onelinejwttoken");
    console.log("token in login useeffect", token);
    if (token) {
      navigate("/userprofile");
    }
  }, []);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(defaultTheme.breakpoints.down("sm"));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formErrors: { email?: string; password?: string } = {};

    // Validate email
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
    }

    // Validate password
    if (!password) {
      formErrors.password = "Password is required";
    }

    // Set errors state
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log({ email, password });
    const data = { email: email, password: password };
    // Clear errors if validation passes
    setErrors({});

    //
    try {
      // Make POST request with Axios
      const result = await axios.post("http://localhost:4000/login", data);
      console.log(result.data, "hi i am avinash");
      if (result.data.success) {
        toast.info("logged in successfully");
        // localStorage.setItem("otp", result.data.data.otp);
        localStorage.setItem("onelinejwttoken", result.data.token);
        navigate("/userProfile");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error duriing signup:", error);
      if (axios.isAxiosError(error)) {
        console.log("isAxiosError :", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
    //
  };

  const signup = () => {
    navigate("/signup");
  };

  const forgot = async () => {
    try {
      const { value: email } = await Swalert.fire({
        title: "Forgot Password",
        input: "email",
        inputLabel: "Enter your email address",
        inputPlaceholder: "Enter your email address",
        showCloseButton: true,
        customClass: {
          confirmButton: "orange-theme-confirm-button",
          cancelButton: "orange-theme-cancel-button",
        },
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        // title: "Forgot Password",
        // input: "email",
        // inputLabel: "Enter your email address",
        // inputPlaceholder: "Enter your email address",
        // showCloseButton: true,
      });
      //

      //
      if (email) {
        const response: any = await axios.post(
          "http://localhost:4000/verifyEmail",
          { email }
        );
        console.log("Full Response:", response.data);
        if (response.data.success) {
          toast.info("veryfy your email....");

          // navigate("/otp");
          //

          // const { value: otp } = await Swal.fire({
          //     title: "OTP Verification",
          //     input: "text",
          //     inputLabel: "Enter the OTP sent to your email",
          //     inputPlaceholder: "OTP",
          //     confirmButtonText: "Verify",
          //     showCancelButton: true,
          //     inputValidator: (value) => {
          //         if (!value) {
          //             return "You need to enter the OTP!";
          //         }
          //         if (value != verifyResponse.data.user_data.otp) {
          //             return "Invalid otp"
          //         }
          //     }
          // });
          const { value: otp } = await Swalert.fire({
            title: "OTP Verification",
            input: "text",
            inputLabel: "Enter the OTP sent to your email",
            inputPlaceholder: "OTP",
            showCloseButton: true,
            customClass: {
              confirmButton: "orange-theme-confirm-button",
              cancelButton: "orange-theme-cancel-button",
            },
            confirmButtonText: "Verify",
            cancelButtonText: "Cancel",
            showCancelButton: true,
            inputValidator:async (value) => {
              if (!value) {
                return "You need to enter the OTP!";
              }else if(value){
                //
                console.log(value," value in client side swal")
                const otp=value
                  const operation = "change_password_otp";
                  const response: any = await axios.post(
                    "http://localhost:4000/verifyOtp",
                    { otp, operation }
                  );
                  if (!response.data.success) {
                    return "Invalid otp"
                  }
                
                //
              }
              // if (value != verifyResponse.data.user_data.otp) {
              //     return "Invalid otp"
              // }
            },
          });
          //
          if (otp) {
            const operation = "change_password_otp";
            const response: any = await axios.post(
              "http://localhost:4000/verifyOtp",
              { otp, operation }
            );
            if (response.data.success) {
              //change password ui
              //
              const { value: formValues } = await Swalert.fire({
                title: "Reset Password",
                html:
                  '<input id="swal-input1" type="password" class="swal2-input" placeholder="New Password">' +
                  '<input id="swal-input2" type="password" class="swal2-input" placeholder="Confirm Password">',
                focusConfirm: false,
                confirmButtonText: "Change Password",
                showCancelButton: true,
                preConfirm: () => {
                  const password = (
                    document.getElementById("swal-input1") as HTMLInputElement
                  ).value;
                  const confirmPassword = (
                    document.getElementById("swal-input2") as HTMLInputElement
                  ).value;

                  if (!password || !confirmPassword) {
                    Swalert.showValidationMessage("Both fields are required!");
                    return;
                  }

                  if (password !== confirmPassword) {
                    Swalert.showValidationMessage("Passwords do not match!");
                    return;
                  }

                  return { password, confirmPassword };
                },
              });

              if (formValues) {
                const { password } = formValues;

                const resetResponse = await axios.post(
                  "http://localhost:4000/resetPassword",
                  {
                    email,
                    newPassword: password,
                  }
                );

                if (resetResponse.data.success) {
                  Swalert.fire({
                    title: "Success",
                    text: "Your password has been reset!",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
                  navigate("/");
                } else {
                  toast.error(resetResponse.data.message);
                }
              }
              // } else {
              //     await Swalert.fire({
              //         title: "Invalid OTP",
              //         text: "The OTP you entered is incorrect. Please try again.",
              //         icon: "error",
              //         confirmButtonText: "Retry"
              //     });
              // }

              //
            } else {
              toast.error(response.data.message);
            }
          }

        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {}
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
            Sign in
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#D3A221" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  onClick={forgot}
                  style={{ cursor: "pointer" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={signup}
                  style={{ cursor: "pointer" }}
                >
                  {"Don't have an account? Sign Up"}
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
