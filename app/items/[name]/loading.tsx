import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function PokemonLoading() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fff",
      }}
    >
      <Stack spacing={2} alignItems="center">
        {/* Spinner chính */}
        <CircularProgress
          size={60}
          thickness={4}
          sx={{ color: "primary.main" }}
        />

        {/* Text thông báo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "text.secondary",
            animation: "pulse 1.5s infinite ease-in-out",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.5 },
            },
          }}
        >
          Loading Pokédex...
        </Typography>
      </Stack>
    </Box>
  );
}
