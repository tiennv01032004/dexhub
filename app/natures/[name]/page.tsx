"use client";

import { notFound, useParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  alpha,
  Chip,
  Skeleton,
  LinearProgress,
  Button,
} from "@mui/material";
import {
  Restaurant,
  InfoOutlined,
  Translate,
  SportsKabaddi,
  AutoGraph,
  Psychology,
  Fingerprint,
  ChevronLeft,
} from "@mui/icons-material";
import { useGetNatureDetailQuery } from "@/store/services/pokeApi";
import Link from "next/link";
import NatureName from "./components/NatureName";
import NatureCompetitive from "./components/NatureCompetitive";
import NatureStat from "./components/NatureStat";
import NatureBattle from "./components/NatureBattle";
import NatureTaste from "./components/NatureTaste";
import NatureLanguage from "./components/NatureLanguage";
import { Nature } from "@/types/Nature";
import { NatureDetail } from "@/types/NatureDetail";

const languageMap: Record<string, string> = {
  en: "English",
  ja: "Japanese",
  fr: "French",
  de: "German",
  it: "Italian",
  es: "Spanish",
  ko: "Korean",
};

export default function NatureDetailPage() {
  const params = useParams();
  const name = params.name as string;
  const { data: nature, isLoading, error } = useGetNatureDetailQuery(name);

  if (error) notFound();

  return (
    <Box sx={{ py: 4, bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <NatureName />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <NatureCompetitive />
          </Grid>

          {/* 4. Stat Modifiers (4) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <NatureStat />
          </Grid>

          {/* 6. Battle Behavior (7) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <NatureBattle />
          </Grid>

          {/* 7. Taste (5) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <NatureTaste />
          </Grid>

          {/* 8. Translations (12) */}
          <Grid size={{ xs: 12 }}>
            <NatureLanguage />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
