import { Box, Card, CardContent, Grid, Skeleton, Stack } from "@mui/material";
import PokemonCardSkeleton from "./PokemonCardSkeleton";
import React from "react";

interface PreviewSectionSkeletonProps {
  children: React.ReactNode;
}

export default function PreviewSectionSkeleton({
  children,
}: PreviewSectionSkeletonProps) {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                p: 1.5,
                borderRadius: "16px",
                display: "flex",
                bgcolor: "background.paper",
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{ width: 32, height: 32 }}
                animation="wave"
              />
            </Box>
            <Box>
              <Skeleton
                variant="text"
                animation="wave"
                width={500}
                height={30}
              />
              <Skeleton
                variant="text"
                width={300}
                height={24}
                animation="wave"
              />
            </Box>
          </Stack>

          <Skeleton
            variant="rectangular"
            animation="wave"
            width={200}
            height={50}
          />
        </Stack>

        <Grid container spacing={3}>
          {children}
        </Grid>
      </CardContent>
    </Card>
  );
}
