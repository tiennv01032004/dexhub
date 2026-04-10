import { useGetMoveDetailQuery } from "@/store/services/pokeApi";
import { getTypeIcon } from "@/utils/heplers";
import {
  alpha,
  Box,
  Chip,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";

export default function MoveName() {
  const { name } = useParams();
  const theme = useTheme();
  const { data: move, isLoading } = useGetMoveDetailQuery(name);

  if (isLoading || !move) {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ mb: 5 }}
      >
        <Box sx={{ width: "100%" }}>
          <Skeleton
            variant="text"
            sx={{
              width: { xs: "200px", md: "400px" },
              height: { xs: "2.5rem", md: "4rem" },
              mb: 2,
              borderRadius: "8px",
            }}
            animation="wave"
          />

          <Stack direction="row" spacing={1.5}>
            <Skeleton
              variant="rounded"
              width={100}
              height={32}
              sx={{ borderRadius: "16px" }}
            />
            <Skeleton
              variant="rounded"
              width={120}
              height={32}
              sx={{ borderRadius: "16px" }}
            />
          </Stack>
        </Box>

        <Skeleton
          variant="text"
          width={120}
          height={60}
          sx={{ display: { xs: "none", sm: "block" } }}
          animation="wave"
        />
      </Stack>
    );
  }

  const typeColor = theme.palette.pokemonType[move.type.name] || "#777";

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      sx={{ mb: 5 }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontWeight: 900,
            textTransform: "capitalize",
            letterSpacing: -1,
            color: "#0F172A",
            lineHeight: 1,
            mb: 2,
          }}
        >
          {name?.toString().replace(/-/g, " ")}
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <Chip
            icon={
              <Box
                component="img"
                src={getTypeIcon(move.type.name)}
                sx={{ width: 16, ml: "8px !important" }}
              />
            }
            label={move.type.name}
            sx={{
              bgcolor: typeColor,
              color: "#fff",
              fontWeight: 800,
              textTransform: "uppercase",
              height: 32,
            }}
          />
          <Chip
            icon={
              <Box
                component="img"
                src={`https://img.pokemondb.net/images/icons/move-${move.damage_class.name}.png`}
                sx={{ width: 20, height: 20, ml: "8px !important" }}
              />
            }
            label={move.damage_class.name}
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              bgcolor: "#fff",
              border: "1px solid #CBD5E1",
              height: 32,
            }}
          />
        </Stack>
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          color: alpha(typeColor, 0.15),
          lineHeight: 1,
        }}
      >
        #{move?.id.toString().padStart(3, "0")}
      </Typography>
    </Stack>
  );
}
