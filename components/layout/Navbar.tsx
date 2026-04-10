"use client";

import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
  alpha,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { BRAND, LOGO, NAV_ITEMS } from "@/constants";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Search from "./Search";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        color: "#2d3436",
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            height: { xs: 64, md: 80 },
            px: { xs: 0 },
            gap: { md: 4 },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            onClick={() => router.push("/")}
            sx={{ cursor: "pointer", flexShrink: 0 }}
          >
            <Avatar
              src={LOGO}
              sx={{ width: 42, height: 42, borderRadius: "14px" }}
            />
            <Typography
              variant="h5"
              fontWeight="900"
              sx={{
                letterSpacing: -1.5,
                textTransform: "uppercase",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                display: { xs: "none", sm: "block" },
              }}
            >
              {BRAND}
            </Typography>
          </Stack>

          <Search />

          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", lg: "flex" }, flexShrink: 0 }}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href} passHref>
                  <Button
                    sx={{
                      color: active ? "#ed1c24" : "#2d3436",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      position: "relative",
                      "&:hover": { color: "#ed1c24", bgcolor: "transparent" },
                      "&::after": active
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: 4,
                            left: "20%",
                            right: "20%",
                            height: "2px",
                            bgcolor: "#ed1c24",
                            borderRadius: "2px",
                          }
                        : {},
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </Stack>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { lg: "none" }, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { width: "70%", maxWidth: 300, bgcolor: "white" },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="end"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <List>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      router.push(item.href);
                      handleDrawerToggle();
                    }}
                    sx={{
                      borderRadius: "10px",
                      mb: 0.5,
                      bgcolor: active ? alpha("#ed1c24", 0.08) : "transparent",
                      color: active ? "#ed1c24" : "inherit",
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: active ? 800 : 600,
                        color: active ? "#ed1c24" : "inherit",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
