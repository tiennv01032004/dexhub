import { Species } from "@/types/PokemonDetail";
import { extractIdFromUrl } from "@/utils/heplers";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface PokemonCardProps {
  pokemon: Species;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const id = extractIdFromUrl(pokemon.url);
  const router = useRouter();

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "24px",
        p: 2,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        border: "1px solid #EDF2F7",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
        },
      }}
      onClick={() => router.push(`/pokemon/${pokemon.name}`)}
    >
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
        <Typography
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            fontWeight: 900,
            color: "rgba(0,0,0,0.04)",
            fontSize: "1.8rem",
          }}
        >
          #{String(id).padStart(3, "0")}
        </Typography>
        <Avatar
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={pokemon.name}
          style={{
            width: "75%",
            height: "75%",
            objectFit: "contain",
            zIndex: 1,
          }}
        />
      </Box>

      <Stack spacing={1.5} sx={{ px: 1, pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#2D3748",
            textTransform: "capitalize",
          }}
        >
          {pokemon.name}
        </Typography>

        {/* <Stack direction="row" spacing={1}>
            {pokemon.types.map((type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                sx={{
                  bgcolor: alpha(pokemon.color, 0.08),
                  color: pokemon.color,
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  borderRadius: "8px",
                  border: `1px solid ${alpha(pokemon.color, 0.15)}`,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              />
            ))}
          </Stack> */}
      </Stack>
    </Box>
  );
}
