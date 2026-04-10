"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  ButtonBase,
  SwipeableDrawer,
  Button,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import { ItemCategoriesSummary } from "@/types/ItemCategories";
import PreviewSection from "./PreviewSection";
import { useGetItemCategoryListQuery } from "@/store/services/pokeApi";
import Link from "next/link";

export default function HomeItemCategories() {
  const [open, setOpen] = useState(false);
  const { data: category, isLoading } = useGetItemCategoryListQuery(undefined);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  if (isLoading || !category) {
    return (
      <Paper elevation={0} sx={{ mt: 10, p: 3 }}>
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2,
            mb: 4,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={80}
              sx={{ borderRadius: "16px" }}
            />
          ))}
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Skeleton
            variant="rounded"
            width={200}
            height={45}
            sx={{ mx: "auto", borderRadius: "12px" }}
          />
        </Box>
      </Paper>
    );
  }

  const previewItems = category.results.slice(0, 8);

  return (
    <Paper elevation={0} sx={{ mt: 10, p: 3 }}>
      <PreviewSection
        title="Items & Inventory"
        subtitle="Comprehensive guide to every item, berry, and technical machine in the Pokémon world."
        icon="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/explorer-kit.png"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2,
            mb: 4,
          }}
        >
          {previewItems.map((r: ItemCategoriesSummary) => (
            <ButtonBase
              component={Link}
              href={`/items?category=${r.name}`}
              key={r.name}
              sx={{
                p: 2,
                borderRadius: "16px",
                bgcolor: "background.paper",
                minHeight: "80px",
                border: "1px solid #E2E8F0",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  color: "primary.main",
                  borderColor: "primary.main",
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {r.name.replace(/-/g, " ")}
              </Typography>
            </ButtonBase>
          ))}
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            onClick={toggleDrawer(true)}
            startIcon={<GridViewIcon />}
            sx={{
              borderRadius: "12px",
              px: 4,
              py: 1,
              fontWeight: 800,
              textTransform: "none",
            }}
          >
            View All {category.results.length} Categories
          </Button>
        </Box>

        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableSwipeToOpen={false}
          PaperProps={{
            sx: {
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              maxHeight: "80vh",
              p: 3,
              bgcolor: "background.default",
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 6,
              bgcolor: "#E2E8F0",
              borderRadius: 3,
              mx: "auto",
              mb: 3,
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 900, mb: 3, textAlign: "center" }}
          >
            All Categories
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
              overflowY: "auto",
              pb: 5,
            }}
          >
            {category.results.map((r: ItemCategoriesSummary) => (
              <ButtonBase
                component={Link}
                href={`/items?category=${r.name}`}
                key={r.name}
                onClick={toggleDrawer(false)}
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  minHeight: "60px",
                  bgcolor: "background.paper",
                  border: "1px solid #F1F5F9",
                  "&:hover": {
                    color: "primary.main",
                    borderColor: "primary.main",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  {r.name.replace(/-/g, " ")}
                </Typography>
              </ButtonBase>
            ))}
          </Box>
        </SwipeableDrawer>
      </PreviewSection>
    </Paper>
  );
}
