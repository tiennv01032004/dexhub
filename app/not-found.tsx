"use client";

import { Home, Replay, SentimentVeryDissatisfied } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function NotfoundPage() {
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 10 } }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: "40px",
              textAlign: "center",
              bgcolor: alpha("#f43f5e", 0.02),
              border: "1px dashed",
              borderColor: alpha("#f43f5e", 0.3),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
            elevation={0}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: alpha("#f43f5e", 0.1),
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SentimentVeryDissatisfied
                sx={{ fontSize: 40, color: "#e11d48" }}
              />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                404 Not Found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The url "<strong>{url}</strong>" could not be found. It might be
                a typo or doesn't exist in the DexHub
              </Typography>
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={Link}
                href="/"
                variant="contained"
                startIcon={<Home />}
                sx={{
                  borderRadius: "16px",
                  px: 4,
                  bgcolor: "#1e293b",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Back to List
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outlined"
                startIcon={<Replay />}
                sx={{
                  borderRadius: "16px",
                  px: 4,
                  color: "text.primary",
                  borderColor: "divider",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Try Again
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
