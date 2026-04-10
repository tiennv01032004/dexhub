import { useGetAbilityDetailQuery } from "@/store/services/pokeApi";
import { EffectChange, EffectEntry } from "@/types/AbilityDetail";
import { Update } from "@mui/icons-material";
import { Box, Chip, Paper, Stack, Typography, Skeleton } from "@mui/material";
import { useParams } from "next/navigation";

export default function AbilityEffectChange() {
  const { name } = useParams();
  const { data: ability, isLoading } = useGetAbilityDetailQuery(name);

  if (isLoading || !ability) {
    return (
      <Paper
        sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
        elevation={0}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton
            variant="text"
            width={180}
            height={32}
            sx={{ transform: "none" }}
          />
        </Stack>

        <Stack spacing={3}>
          {[...Array(2)].map((_, idx) => (
            <Box key={idx}>
              <Skeleton
                variant="rounded"
                width={150}
                height={24}
                sx={{ mb: 1.5, borderRadius: "16px" }}
              />
              <Box sx={{ pl: 2, borderLeft: "2px solid #e2e8f0" }}>
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ transform: "none", mb: 0.5 }}
                />
                <Skeleton
                  variant="text"
                  width="70%"
                  height={20}
                  sx={{ transform: "none" }}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    );
  }

  const hasChanges =
    ability.effect_changes && ability.effect_changes.length > 0;

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
      }}
      elevation={0}
    >
      <SectionTitle
        icon={<Update fontSize="small" />}
        title="Mechanic Changes"
        color="primary.main"
      />

      {hasChanges ? (
        <Stack spacing={3}>
          {ability.effect_changes.map((change: EffectChange, idx: number) => (
            <Box key={idx}>
              <Chip
                label={`Changed in ${change.version_group.name.replace(/-/g, " ")}`}
                size="small"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  bgcolor: "#d32f2f",
                  color: "#fff",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#475569",
                  lineHeight: 1.7,
                  pl: 2,
                  borderLeft: "2px solid #e2e8f0",
                }}
              >
                {change.effect_entries.find(
                  (e: EffectEntry) => e.language.name === "en",
                )?.effect || "No change details recorded."}
              </Typography>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box sx={{ py: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: "#94a3b8", fontStyle: "italic" }}
          >
            This ability has maintained its original mechanics since its
            introduction in{" "}
            <strong style={{ color: "#64748b" }}>
              {ability.generation.name.replace(/-/g, " ").toUpperCase()}
            </strong>
            .
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

const SectionTitle = ({
  icon,
  title,
  color = "primary.main",
}: {
  icon: React.ReactNode;
  title: string;
  color?: string;
}) => (
  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
    <Box sx={{ color }}>{icon}</Box>
    <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b" }}>
      {title}
    </Typography>
  </Stack>
);
