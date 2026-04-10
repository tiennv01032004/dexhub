"use client";
import { Box, Container, Grid } from "@mui/material";
import ItemImage from "./ItemImage";
import ItemEffect from "./ItemEffect";
import ItemPrice from "./ItemPrice";
import ItemFling from "./ItemFling";
import ItemLanguage from "./ItemLanguage";
import ItemDescription from "./ItemDescription";
import ItemAttribute from "./ItemAttribute";
import ItemPokemon from "./ItemPokemon";
import { notFound, useParams } from "next/navigation";
import { useGetItemDetailQuery } from "@/store/services/pokeApi";

export default function ItemDetailWrapper() {
  const { name } = useParams();

  const { error } = useGetItemDetailQuery(name);

  if (error) notFound();

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <ItemImage />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
              <Grid size={{ xs: 12, md: 12 }}>
                <ItemEffect />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ItemPrice />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ItemFling />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ItemLanguage />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ItemDescription />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <ItemAttribute />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <ItemPokemon />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
