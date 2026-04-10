import { client } from "@/lib/contentful";
import { Box, Container, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

interface BannerProps {
  banner: string;
}

export default function Banner({ banner }: BannerProps) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await client.getEntries({
          content_type: "banner",
          "fields.title": banner,
        });
        if (response.items.length > 0) {
          setData(response.items[0]);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      } finally {
      }
    };

    fetchBanner();
  }, [banner]);

  if (!data) {
    return (
      <Box sx={bannerContainerStyle(null)}>
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Skeleton
            variant="text"
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              mx: "auto",
              width: "80%",
              height: { xs: 60, md: 100 },
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Skeleton
              variant="text"
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                mx: "auto",
                width: "60%",
              }}
            />
            <Skeleton
              variant="text"
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                mx: "auto",
                width: "40%",
              }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            sx={{
              width: "60px",
              height: "4px",
              mx: "auto",
              mt: 4,
              borderRadius: "2px",
              bgcolor: "rgba(255,255,255,0.1)",
            }}
          />
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={bannerContainerStyle(data.fields.img.fields.file.url)}>
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            mb: 2,
            fontSize: { xs: "2.8rem", md: "4.5rem" },
            textShadow: "2px 4px 10px rgba(0,0,0,0.5)",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          Pokémon{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            {data.fields.title}
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            opacity: 0.95,
            fontWeight: 400,
            maxWidth: "700px",
            mx: "auto",
            lineHeight: 1.6,
            fontSize: { xs: "1rem", md: "1.25rem" },
            textShadow: "1px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {data.fields.subtitle}
        </Typography>

        <Box
          sx={{
            width: "60px",
            height: "4px",
            bgcolor: "primary.main",
            mx: "auto",
            mt: 4,
            borderRadius: "2px",
          }}
        />
      </Container>
    </Box>
  );
}

const bannerContainerStyle = (imgUrl: string | null) => ({
  position: "relative",
  color: "primary.contrastText",
  pt: { xs: 10, md: 15 },
  pb: { xs: 8, md: 12 },
  mb: 6,
  textAlign: "center",
  overflow: "hidden",
  backgroundImage: imgUrl ? `url('https:${imgUrl}')` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)",
    zIndex: 1,
  },
});
