import { Box, Button, CardMedia, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const LOCATIONS = [
  { id: "C1", type: "city", x: 48.4, y: 59.7 },
  { id: "C2", type: "city", x: 26.3, y: 59.7 },
  { id: "R1", type: "route", x: 23.4, y: 53.3 },
  { id: "R2", type: "route", x: 20.3, y: 57.7 },
  { id: "R3", type: "route", x: 20.4, y: 52.9 },
  { id: "R4", type: "route", x: 18.9, y: 50.9 },
  { id: "R5", type: "route", x: 12.3, y: 51.2 },
  { id: "R6", type: "route", x: 15.0, y: 59.8 },
  { id: "R7", type: "route", x: 14.9, y: 66.6 },
  { id: "R8", type: "route", x: 7.4, y: 69.6 },
  { id: "C3", type: "city", x: 7.0, y: 74.1 },
];

export default function PaldeaMap() {
  const [location, setLocation] = useState<any>([]);

  const handleTest = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setLocation((prev: any) => {
      return [
        ...prev,
        {
          id: new Date().getTime(),
          type: "city",
          x: x.toFixed(1),
          y: y.toFixed(1),
        },
      ];
    });
  };

  useEffect(() => {
    console.log("Dữ liệu location mới nhất:", location);
  }, [location]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        paddingTop: "70.7%",
        bgcolor: "#000",
        overflow: "hidden",
      }}
      onClick={handleTest}
    >
      <CardMedia
        component="img"
        image="https://res.cloudinary.com/dozfckc33/image/upload/v1773645689/Paldea_aljvyx.png"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <polyline
          points={LOCATIONS.map((loc) => `${loc.x},${loc.y}`).join(" ")}
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.5))" }}
        />
      </svg>

      {LOCATIONS.filter((loc) => loc.type === "city").map((loc) => (
        <Paper
          key={loc.id}
          elevation={3}
          sx={{
            position: "absolute",
            left: `${loc.x}%`,
            top: `${loc.y}%`,
            width: "3vw",
            height: "3vw",
            minWidth: "14px",
            minHeight: "14px",
            backgroundColor: "#ff1f1f",
            border: "2px solid white",
            transform: "translate(-50%, -50%)",
            borderRadius: "4px",
            zIndex: 2,
            "&:hover": {
              transform: "translate(-50%, -50%) scale(1.2)",
              cursor: "pointer",
            },
          }}
        />
      ))}
    </Box>
  );
}
