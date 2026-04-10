"use client";
import React, { useMemo, useEffect } from "react";
import {
  Grid,
  Skeleton,
  Card,
  CardActionArea,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useGetItemCategoryDetailQuery,
  useGetItemListQuery,
} from "@/store/services/pokeApi";
import { getItemPlaceholder } from "@/utils/heplers";
import { Result } from "@/types/Generation";

export default function ItemList() {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParams = searchParams.get("category");

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const columns = isMobile ? 2 : 4;

  const { data: items, isFetching: isFetchingAll } =
    useGetItemListQuery(undefined);
  const { data: itemCategoryDetail, isFetching: isFetchingCategory } =
    useGetItemCategoryDetailQuery(categoryParams, { skip: !categoryParams });

  const showSkeleton = !categoryParams ? isFetchingAll : isFetchingCategory;

  const displayItems = useMemo(() => {
    if (!categoryParams) return items?.results || [];
    return itemCategoryDetail?.items || [];
  }, [categoryParams, items, itemCategoryDetail]);

  // Virtualizer tính toán dựa trên số cột thay đổi
  const rowCount = Math.ceil(displayItems.length / columns);
  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => (isMobile ? 230 : 240),
    overscan: 5,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryParams]);

  if (showSkeleton) {
    return (
      <Grid container spacing={isMobile ? 1 : 2}>
        {Array.from(new Array(8)).map((_, index) => (
          <Grid size={isMobile ? 6 : 3} key={index}>
            <Skeleton
              variant="rectangular"
              height={160}
              sx={{ borderRadius: "15px" }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div
      style={{
        height: `${virtualizer.getTotalSize()}px`,
        width: "100%",
        position: "relative",
      }}
    >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const startIndex = virtualRow.index * columns;
        const itemsInRow = displayItems.slice(startIndex, startIndex + columns);

        return (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <Grid
              container
              spacing={isMobile ? 1 : 2}
              sx={{ mb: isMobile ? 1 : 2 }}
            >
              {itemsInRow.map((item: Result) => (
                <Grid size={isMobile ? 6 : 3} key={item.name}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: "15px",
                      border: "1px solid #eceff1",
                      height: "100%",
                      "&:hover": { borderColor: "#ed1c24" },
                    }}
                  >
                    <CardActionArea
                      onClick={() => router.push(`/items/${item.name}`)}
                      sx={{ p: isMobile ? 1 : 2, textAlign: "center" }}
                    >
                      <Box
                        sx={{
                          bgcolor: "#f8f9fa",
                          borderRadius: "12px",
                          aspectRatio: "1/1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 1,
                        }}
                      >
                        <Box
                          component="img"
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                          sx={{
                            width: isMobile ? 35 : 45,
                            height: isMobile ? 35 : 45,
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            (e.target as HTMLIFrameElement).src =
                              getItemPlaceholder(item.name);
                          }}
                        />
                      </Box>
                      <Typography
                        variant={isMobile ? "caption" : "body2"}
                        sx={{
                          fontWeight: 700,
                          textTransform: "capitalize",
                          display: "block",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.name.replace(/-/g, " ")}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        );
      })}
    </div>
  );
}
