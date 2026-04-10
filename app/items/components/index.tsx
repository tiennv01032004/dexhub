"use client";
import { Box, Container, Grid } from "@mui/material";
import ItemFilter from "./ItemFilter";
import ItemList from "./ItemList";
import Banner from "@/components/layout/Banner";

export default function ItemWrapper() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Banner banner="items" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <ItemFilter />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <ItemList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
