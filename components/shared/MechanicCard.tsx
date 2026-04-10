import { AbilitySummary } from "@/types/Ability";
import { NatureSummary } from "@/types/Nature";
import { StatusSummary } from "@/types/Status";
import { Box, ButtonBase, Typography } from "@mui/material";

interface MechanicCardProps {
  mechanic: AbilitySummary | NatureSummary | StatusSummary;
}

export default function MechanicCard({ mechanic }: MechanicCardProps) {
  return (
    <ButtonBase
      sx={{
        width: "100%",
        minHeight: "50px",
        bgcolor: "background.paper",
        borderRadius: "4px",
        borderLeft: `6px solid red`,
        display: "flex",
        alignItems: "center",
        px: 3,
        boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
        transition: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          "& .status-tag": { color: "#fff", borderColor: "#fff" },
        },
      }}
    >
      <Box sx={{ textAlign: "left", flexGrow: 1 }}>
        <Typography
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
          }}
        >
          {mechanic.name}
        </Typography>
      </Box>
    </ButtonBase>
  );
}
