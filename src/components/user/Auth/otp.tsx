import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import image from "../../../assets/bg_onliner3.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { userEndpoints } from "../../../Constarints/endpoints/userEndpoints";

const defaultTheme = createTheme();

export default function OtpEntry() {
  const navigate = useNavigate();
  const [timer, setTimer] = React.useState(60); // State for countdown timer
  const [isResendDisabled, setIsResendDisabled] = React.useState(true); // State to enable/disable resend button
  const [isLoading, setIsLoading] = React.useState(false); // Loading status
  
  React.useEffect(() => {
    // Timer countdown logic
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown); // Clean up the timer
    } else {
      setIsResendDisabled(false); // Enable the resend button when timer reaches 0
    }
  }, [timer]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Extracting OTP value from the input fields
    const otp = `${data.get("otp1")}${data.get("otp2")}${data.get(
      "otp3"
    )}${data.get("otp4")}`;
    console.log("This is the OTP typed by the client:", otp);

    const otpData: any = { otp: otp };
    console.log(data, "this is the otp typed by client");
    const result = await axios.post(userEndpoints.otpVerify, otpData);
    if (result.data.success === true) {
      toast.success(result.data.message);
      console.log("user created");
      navigate("/");
    } else {
      toast.error(result.data.message);
      console.log("error otp not matching");
    }
  };

  const handleResendOtp = async () => {
    setIsResendDisabled(true); // Disable button after clicking
    setTimer(60); // Reset timer
    try {
      // Send request to resend OTP
      const response = await axios.post(userEndpoints.resendOtp);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
      console.error("Error resending OTP:", error);
    }
  };

  const isSmallScreen = useMediaQuery(defaultTheme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
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
            Enter OTP
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              {[...Array(4)].map((_, index) => (
                <TextField
                  key={index}
                  margin="normal"
                  required
                  sx={{ width: "60px" }}
                  name={`otp${index + 1}`}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "24px" },
                  }}
                  autoComplete="off"
                  autoFocus={index === 0}
                />
              ))}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2, bgcolor: "#D3A221" }}
            >
              Verify OTP
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              sx={{ mt: 2 }}
            >
              {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
