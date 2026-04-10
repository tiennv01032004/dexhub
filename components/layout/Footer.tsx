"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { BRAND, LOGO } from "@/constants";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#121212",
        color: "rgba(255,255,255,0.5)",
        pt: { xs: 6, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 10 }}
          sx={{ mb: { xs: 6, md: 10 } }}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ mb: 3 }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "background.default",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Avatar src={LOGO} sx={{ width: "100%", height: "100%" }} />
              </Box>
              <Typography
                variant="h5"
                fontWeight="900"
                sx={{
                  color: "white",
                  letterSpacing: -1,
                  textTransform: "uppercase",
                }}
              >
                {BRAND}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.8, mb: 4, maxWidth: { md: 300 } }}
            >
              The most comprehensive digital map for your Pokémon adventure.
              Data optimized for mobile and desktop experience.
            </Typography>
            <Stack direction="row" spacing={2}>
              {["FB", "TW", "IG", "YT"].map((social) => (
                <Avatar
                  key={social}
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: "rgba(255,255,255,0.05)",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { bgcolor: "#DC0A2D", color: "white" },
                  }}
                >
                  {social}
                </Avatar>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight="900"
              sx={{ color: "white", mb: { xs: 2, md: 4 } }}
            >
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {["Pokédex", "Abilities", "Moves", "Items", "Locations"].map(
                (link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{ cursor: "pointer", "&:hover": { color: "white" } }}
                  >
                    {link}
                  </Typography>
                ),
              )}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight="900"
              sx={{ color: "white", mb: { xs: 2, md: 4 } }}
            >
              Legal
            </Typography>
            <Stack spacing={1.5}>
              {[
                "Privacy Policy",
                "Terms of Use",
                "Cookie Policy",
                "Disclaimer",
              ].map((link) => (
                <Typography
                  key={link}
                  variant="body2"
                  sx={{ cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="subtitle1"
              fontWeight="900"
              sx={{ color: "white", mb: { xs: 2, md: 4 } }}
            >
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Sign up to receive notifications about the latest events and
              Pokemon.
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Email..."
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "transparent" },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#DC0A2D",
                  fontWeight: "900",
                  px: { xs: 2, md: 4 },
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#b30825" },
                }}
              >
                Join
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 4 }} />

        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            fontSize: "0.7rem",
            opacity: 0.5,
            lineHeight: 1.6,
          }}
        >
          © 2026 {BRAND.toUpperCase()}. DEVELOPED BY NGUYEN VAN TIEN <br />
          POKÉMON CHARACTER NAMES ARE TM OF NINTENDO.
        </Typography>
      </Container>
    </Box>
  );
}
