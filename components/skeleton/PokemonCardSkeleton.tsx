import { Box, Card, Skeleton, Stack, Grid } from "@mui/material";

export default function PokemonCardSkeleton() {
  return (
    // Giữ nguyên Grid size để không bị nhảy layout khi load xong
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: "24px",
          p: 2,
          border: "1px solid #EDF2F7",
        }}
      >
        {/* Phần chứa Ảnh giả lập */}
        <Box
          sx={{
            bgcolor: "#F7FAFC",
            borderRadius: "18px",
            aspectRatio: "1/1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Giả lập số ID #000 ở góc */}
          <Skeleton
            variant="text"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 60,
              height: 40,
              bgcolor: "rgba(0,0,0,0.04)",
            }}
            animation="wave"
          />

          {/* Giả lập Pokémon chính */}
          <Skeleton
            variant="rectangular"
            width="70%"
            height="70%"
            animation="wave"
          />
        </Box>

        {/* Phần chứa Text & Chips */}
        <Stack spacing={1.5} sx={{ px: 1, pb: 1 }}>
          {/* Giả lập Tên Pokémon */}
          <Skeleton
            variant="text"
            width="80%"
            height={32}
            sx={{ borderRadius: "4px" }}
            animation="wave"
          />

          {/* Giả lập các Tag hệ (Type) */}
          <Stack direction="row" spacing={1}>
            <Skeleton
              variant="rounded"
              width={50}
              height={24}
              sx={{ borderRadius: "8px" }}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={50}
              height={24}
              sx={{ borderRadius: "8px" }}
              animation="wave"
            />
          </Stack>
        </Stack>
      </Box>
    </Grid>
  );
}
