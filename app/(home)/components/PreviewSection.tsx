"use client";

import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PreviewSectionProps {
  title: string;
  subtitle: string;
  icon?: string;
  children: React.ReactNode;
  onViewAll?: () => void;
}

export default function PreviewSection({
  title,
  subtitle,
  icon,
  children,
  onViewAll,
}: PreviewSectionProps) {
  return (
    <Box sx={{ mb: { xs: 4, md: 8 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {icon && (
            <Box
              sx={{
                p: { xs: 1, sm: 1.5 },
                borderRadius: "16px",
                display: "flex",
                bgcolor: "background.paper",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Box
                component="img"
                src={icon}
                sx={{
                  width: { xs: 24, sm: 32 },
                  height: { xs: 24, sm: 32 },
                }}
              />
            </Box>
          )}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "#1A202C",
                lineHeight: 1.2,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#A0AEC0",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Stack>

        {onViewAll && (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={onViewAll}
            sx={{
              fontWeight: 800,
              borderRadius: "12px",
              px: 3,
              py: { xs: 1, sm: 1 },
              textTransform: "none",
              whiteSpace: "nowrap",
              boxShadow: "none",
              width: { xs: "100%", sm: "auto" },
              "&:hover": { boxShadow: "0 8px 15px rgba(0,0,0,0.1)" },
            }}
          >
            View More
          </Button>
        )}
      </Stack>

      <Box sx={{ width: "100%" }}>{children}</Box>
    </Box>
  );
}
