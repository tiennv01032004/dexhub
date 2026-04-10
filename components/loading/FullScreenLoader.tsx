import { LOGO } from "@/constants";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";

export default function FullScreenLoader() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress size={80} thickness={4} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar src={LOGO} />
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 500, letterSpacing: 1 }}
      >
        LOADING...
      </Typography>
    </Box>
  );
}
