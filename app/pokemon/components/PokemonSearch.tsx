import { TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function PokemonSearch() {
  return (
    <TextField
      fullWidth
      placeholder="Search Pokémon..."
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          bgcolor: "#fff",
          "& fieldset": { border: "none" },
          mb: 2,
        },
      }}
      InputProps={{
        startAdornment: <SearchIcon color="disabled" sx={{ mr: 1 }} />,
      }}
    />
  );
}
