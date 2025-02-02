import { CircularProgress, Box, Typography } from "@mui/material";

const Loading = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "25vh",
        p: 2,
        background: "linear-gradient(135deg, rgba(250, 244, 211, 0.3), rgb(168, 131, 40,0.3))", // Yellow gradient
        backdropFilter: "blur(10px)", // Glassmorphism effect(250, 244, 211);, 1
        borderRadius: "8px",
      }}
    >
      <CircularProgress
        size={50}
        thickness={4}
        sx={{
          color: "primary.main",
          animation: "spin 1.5s linear infinite",
        }}
      />
      <Typography
        variant="h6"
        color="text.primary"
        sx={{
          mt: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem", // Increased font size for better visibility
          textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", // Glow effect for better contrast
          letterSpacing: "0.5px",
        }}
      >
        {message}
      </Typography>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fade {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </Box>
  );
};

export default Loading;
