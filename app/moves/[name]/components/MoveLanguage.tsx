import { useGetMoveDetailQuery } from "@/store/services/pokeApi";
import { Name } from "@/types/MoveDetail";
import { getFullLanguageName } from "@/utils/heplers";
import { Paper, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { useParams } from "next/navigation";
import TranslateIcon from "@mui/icons-material/Translate";

export default function MoveLanguage() {
  const { name } = useParams();
  const theme = useTheme();
  const { data: move, isLoading } = useGetMoveDetailQuery(name);

  if (isLoading || !move) {
    return (
      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          height: "100%",
        }}
        elevation={0}
      >
        <Stack direction="row" spacing={1.5} sx={{ mb: 3 }} alignItems="center">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={150} height={32} />
        </Stack>

        <Stack spacing={1}>
          {[...Array(7)].map((_, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent="space-between"
              sx={{
                py: 1.2,
                borderTop: index === 0 ? "none" : "1px solid #F1F5F9",
              }}
            >
              <Skeleton variant="text" width="35%" height={20} />
              <Skeleton variant="text" width="40%" height={20} />
            </Stack>
          ))}
        </Stack>
      </Paper>
    );
  }

  const typeColor = theme.palette.pokemonType[move.type.name] || "#777";

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
        height: "100%",
      }}
      elevation={0}
    >
      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
        <TranslateIcon sx={{ color: typeColor }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Other languages
        </Typography>
      </Stack>
      <Stack spacing={1}>
        {move.names.map((n: Name, index: number) => (
          <Stack
            key={index}
            direction="row"
            justifyContent="space-between"
            sx={{
              py: 1.2,
              borderTop: index === 0 ? "none" : "1px solid #F1F5F9",
            }}
          >
            <Typography
              sx={{
                color: "#64748B",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              {getFullLanguageName(n.language.name)}
            </Typography>
            <Typography
              sx={{
                color: "#1E293B",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            >
              {n.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
