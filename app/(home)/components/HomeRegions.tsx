"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Grid,
  alpha,
  Skeleton,
  Paper,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import PreviewSection from "./PreviewSection";
import { useGetRegionListQuery } from "@/store/services/pokeApi";
import { Result } from "@/types/Generation";
import { getImage } from "@/utils/heplers";

export default function HomesRegion() {
  const { data: region, isLoading } = useGetRegionListQuery(undefined);

  if (isLoading || !region) {
    return (
      <Paper elevation={0} sx={{ mt: 10, p: 3, mb: 10 }}>
        <Box
          sx={{
            display: "flex",
            mb: 4,
            alignItems: "center",
            gap: 2,
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />

          <Stack width="80%" spacing={0.5}>
            <Skeleton variant="text" width="40%" height={30} />
            <Skeleton variant="text" width="60%" />
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 4, md: 4 }}>
              <Skeleton
                variant="rounded"
                sx={{
                  borderRadius: "32px",
                  height: { xs: "240px", md: "300px" },
                  width: "100%",
                }}
              />
              <Box sx={{ mt: -7, ml: 3, position: "relative", zIndex: 1 }}>
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={36}
                  sx={{ borderRadius: "16px" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }

  const result = region.results.filter((r: Result) => r.name !== "orre");

  return (
    <PreviewSection
      title="Khám Phá Các Vùng Đất"
      subtitle="Hành trình băng qua những vùng lãnh thổ huyền thoại trong thế giới Pokemon"
      icon="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/town-map.png"
    >
      <Grid container spacing={3}>
        {result?.map((region: Result) => (
          <Grid key={region.name} size={{ xs: 12, sm: 4, md: 4 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "32px",
                overflow: "hidden",
                height: { xs: "240px", md: "300px" },
                border: "6px solid #FFF",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-10px)",
                  "& .map-overlay": { opacity: 1 },
                  "& .map-img": { transform: "scale(1.15)" },
                  "& .region-tag": {
                    transform: "translateX(10px)",
                    opacity: 0,
                  },
                },
              }}
            >
              {/* Hình ảnh bản đồ gốc */}
              <Box
                className="map-img"
                component="img"
                src={getImage(region.name)}
                alt={region.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "1s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />

              {/* Lớp phủ chi tiết khi Hover */}
              <Box
                className="map-overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: alpha("#1A202C", 0.7),
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "0.4s",
                  color: "#FFF",
                  textAlign: "center",
                  p: 3,
                }}
              >
                <IconButton
                  sx={{
                    color: "#FFF",
                    mb: 2,
                  }}
                >
                  <ZoomInIcon fontSize="large" />
                </IconButton>
                <Typography
                  variant="h4" // Chỉnh lại h3 xuống h4 để cân đối hơn trong Card
                  sx={{
                    fontWeight: 900,
                    mb: 1,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  {region.name}
                </Typography>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "0.85rem", opacity: 0.8 }}
                >
                  Nhấn để khám phá các địa danh và Pokémon bản địa
                </Typography>
              </Box>

              {/* Nhãn tên vùng (Luôn hiển thị khi chưa hover) */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                className="region-tag"
                sx={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  bgcolor: "rgba(255,255,255,0.95)",
                  px: 2.5,
                  py: 1,
                  borderRadius: "16px",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "0.3s ease",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    color: "#1A202C",
                    fontSize: "1rem",
                    textTransform: "capitalize",
                  }}
                >
                  {region.name}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </PreviewSection>
  );
}
