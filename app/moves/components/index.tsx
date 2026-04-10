"use client";

import { Grid, Box, Container } from "@mui/material";

import MoveFilter from "./MoveFilter";
import MoveList from "./MoveList";
import Banner from "@/components/layout/Banner";

export default function MoveWrapper() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
      }}
    >
      <Banner banner="moves" />
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ py: 4 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <MoveFilter />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <MoveList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
