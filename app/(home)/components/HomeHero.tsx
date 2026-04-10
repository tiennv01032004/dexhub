"use client";

import { Box, Typography, Container } from "@mui/material";

export default function HomeHero() {
  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,1)), url('https://wallpapers.com/images/hd/pokemon-battle-background-1920-x-1080-dlfd5vww6add3ctx.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        minHeight: { xs: "500px", md: "700px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: { xs: "0 0 40px 40px", md: "0 0 80px 80px" },
        backgroundAttachment: "fixed",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontWeight: 950,
            fontSize: { xs: "3.5rem", md: "6rem" },
            letterSpacing: "-0.04em",
            mb: 2,
            lineHeight: 1,
            backgroundImage:
              "linear-gradient(180deg, #2d3436 30%, #DC0A2D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.1))",
          }}
        >
          The Master Library
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 5,
            fontSize: { xs: "1.1rem", md: "1.4rem" },
            color: "text.secondary",
            maxWidth: 700,
            mx: "auto",
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          Unleash the full potential of your team with our next-gen Pokédex.
          Advanced stats, competitive strategies, and real-time data at your
          fingertips.
        </Typography>
      </Container>

      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "100px",
          background:
            "radial-gradient(circle, rgba(220,10,45,0.1) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(20px)",
          zIndex: -1,
        }}
      />
    </Box>
  );
}
