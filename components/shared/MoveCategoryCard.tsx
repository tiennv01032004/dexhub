import { MoveCategoriesSummary } from "@/types/MoveCategories";
import { Box, ButtonBase, Divider, Typography } from "@mui/material";

interface MoveCategoryCardProps {
  moveCategories: MoveCategoriesSummary;
}

export default function MoveCategoryCard({
  moveCategories,
}: MoveCategoryCardProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <ButtonBase
        sx={{
          width: "100%",
          py: 2,
          px: 2,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "left",
          position: "relative",
          overflow: "hidden",
          transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.03)",
            "& .move-name": {
              transform: "translateX(20px)",
              color: "primary.main",
            },
            "& .move-bg-number": {
              opacity: 0.1,
              transform: "scale(1.2)",
            },
          },
        }}
      >
        {/* Nội dung chính */}
        <Box sx={{ display: "flex", alignItems: "center", zIndex: 1 }}>
          <Typography
            variant="h4"
            className="move-name"
            sx={{
              fontSize: "1rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "2px",
              transition: "0.4s",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "primary.main",
                mr: 2,
                borderRadius: "50%",
              }}
            />
            {moveCategories.name.replace(/-/g, " ")}
          </Typography>
        </Box>
      </ButtonBase>

      <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />
    </Box>
  );
}
