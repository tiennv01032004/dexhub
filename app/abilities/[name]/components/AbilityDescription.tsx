"use client";

import { useGetAbilityDetailQuery } from "@/store/services/pokeApi";
import { FlavorTextEntry } from "@/types/AbilityDetail";
import { HistoryEdu, SearchOff } from "@mui/icons-material";
import {
  alpha,
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { useParams } from "next/navigation";

export default function AbilityDescription() {
  const { name } = useParams();
  const { data: ability, isLoading } = useGetAbilityDetailQuery(name as string);

  if (isLoading) {
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
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={180} height={32} />
        </Stack>
        <Stack spacing={3}>
          {[...Array(3)].map((_, index) => (
            <Box key={index}>
              <Skeleton
                variant="rounded"
                width={120}
                height={24}
                sx={{ mb: 1.5, borderRadius: "6px" }}
              />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="85%" height={20} />
              {index !== 2 && <Divider sx={{ mt: 3, opacity: 0.5 }} />}
            </Box>
          ))}
        </Stack>
      </Paper>
    );
  }

  const allFlavorTexts =
    ability?.flavor_text_entries?.filter(
      (e: FlavorTextEntry) => e.language.name === "en",
    ) || [];

  const hasData = allFlavorTexts.length > 0;

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      elevation={0}
    >
      <SectionTitle
        icon={<HistoryEdu fontSize="small" />}
        title="Game Description"
        color="primary.main"
      />

      <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1, maxHeight: 450 }}>
        {!hasData ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              textAlign: "center",
              opacity: 0.6,
            }}
          >
            <SearchOff sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, color: "text.secondary" }}
            >
              No descriptions available
            </Typography>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              Detailed records for this ability could not be found in the
              database.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2.5}>
            {allFlavorTexts.map((item: FlavorTextEntry, index: number) => (
              <Box key={index}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: "primary.main",
                    textTransform: "uppercase",
                    bgcolor: alpha("#1976d2", 0.08),
                    px: 1.2,
                    py: 0.4,
                    borderRadius: "6px",
                    display: "inline-block",
                    letterSpacing: 0.5,
                  }}
                >
                  {item.version_group.name.replace(/-/g, " ")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1.5,
                    color: "#475569",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.flavor_text.replace(/[\n\f]/g, " ")}
                </Typography>
                {index !== allFlavorTexts.length - 1 && (
                  <Divider
                    sx={{ mt: 2.5, opacity: 0.4, borderStyle: "dashed" }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        )}
      </Box>
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
  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
    <Box
      sx={{
        color,
      }}
    >
      {icon}
    </Box>
    <Typography
      variant="h6"
      sx={{ fontWeight: 800, color: "#1e293b", fontSize: "1.1rem" }}
    >
      {title}
    </Typography>
  </Stack>
);
