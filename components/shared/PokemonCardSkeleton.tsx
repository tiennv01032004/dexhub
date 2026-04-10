"use client";

import React from "react";
import { Box, Stack, Paper, Skeleton } from "@mui/material";

export default function PokemonCardSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        spacing={1.5}
        sx={{ width: "100%" }}
      >
        {/* 1. Hình ảnh Pokémon (Khối tròn) */}
        <Box sx={{ width: 120, height: 120 }}>
          <Skeleton
            variant="circular"
            animation="wave"
            width="100%"
            height="100%"
          />
        </Box>

        {/* 2. Số ID (#000) */}
        <Skeleton
          variant="text"
          animation="wave"
          width={40}
          height={20}
          sx={{ borderRadius: 1 }}
        />

        {/* 3. Tên Pokémon (Dòng chữ đậm) */}
        <Skeleton
          variant="text"
          animation="wave"
          width="60%"
          height={30}
          sx={{ borderRadius: 1 }}
        />

        {/* 4. Các Hệ (Hai khối nhỏ bên dưới) */}
        <Stack direction="row" spacing={1}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width={50}
            height={20}
            sx={{ borderRadius: "4px" }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width={50}
            height={20}
            sx={{ borderRadius: "4px" }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
