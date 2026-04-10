import { log } from "console";
import { DASHED_SPECIES, MAPPING_EXCEPTIONS, SPECIAL_FORMS } from "@/constants";
import { NatureDetail } from "@/types/NatureDetail";

export const extractIdFromUrl = (url: string): string => {
  if (!url) return "";
  const idRegex = /\/(\d+)\/?$/;
  const match = url.match(idRegex);
  return match ? match[1] : "";
};

export const capitalizeName = (name: string | undefined): string => {
  if (!name) return "";

  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getDamageResist = (value: number) => {
  if (value === 1) return 2;
  if (value === 2) return 0.5;
  if (value === 3) return 0;
  return 1;
};

export const getImage = (name: string) => {
  return `https://res.cloudinary.com/dozfckc33/image/upload/v1774166268/${name}.png`;
};

export const getMultiplierColor = (val: number) => {
  if (val === 1) return "transparent";
  if (val >= 2) return "#4e9a06";
  if (val === 0) return "#2e3436";
  return "#a40000";
};

export const formatValue = (val: number) => {
  if (val === 0.5) return "½";
  if (val === 0.25) return "¼";
  if (val === 1) return "";
  return val.toString();
};

export const calculateStatRange = (statName: string, baseStat: number) => {
  if (statName === "hp") {
    // HP Min: IV 0, EV 0
    const min = Math.floor(2 * baseStat + 100 + 10);
    // HP Max: IV 31, EV 252
    const max = Math.floor(2 * baseStat + 31 + Math.floor(252 / 4) + 100 + 10);
    return { min, max };
  } else {
    // Other Stats Min: IV 0, EV 0, Nature 0.9
    const min = Math.floor((Math.floor(2 * baseStat) + 5) * 0.9);
    // Other Stats Max: IV 31, EV 252, Nature 1.1
    const max = Math.floor(
      (Math.floor(2 * baseStat + 31 + Math.floor(252 / 4)) + 5) * 1.1,
    );
    return { min, max };
  }
};

export const getSpeciesName = (name: string | undefined): string => {
  if (!name) return "";

  const exceptions = [
    "mr-mime",
    "mime-jr",
    "mr-rime",
    "ho-oh",
    "porygon-z",
    "jangmo-o",
    "hakamo-o",
    "kommo-o",
    "type-null",
    "tapu-koko",
    "tapu-lele",
    "tapu-bulu",
    "tapu-fini",
    "chi-yu",
    "chien-pao",
    "ting-lu",
    "wo-chien",
    "iron-valiant",
    "iron-thorns",
    "iron-treads",
    "iron-bundle",
    "iron-hands",
    "iron-jugulis",
    "iron-moth",
    "iron-leaves",
    "iron-boulder",
    "iron-crown",
    "iron-reliant",
    "roaring-moon",
    "walking-wake",
    "gouging-fire",
    "raging-bolt",
    "sandy-shocks",
    "flutter-mane",
    "great-tusk",
    "brute-bonnet",
    "scream-tail",
    "slither-wing",
  ];

  const lowerName = name.toLowerCase();
  const matchedException = exceptions.find((ex) => lowerName.startsWith(ex));

  if (matchedException) {
    return matchedException;
  }

  return lowerName.split(
    /-(counterfeit|family|male|female|wellspring|cornerstone|hearthflame|snowy|rainy|sunny|amped|low|standard|zen|dawn|ultra|plant|sandy|trash|ice|shadow|single|rapid|dusk|zero|solo|complete|10|50|rock|belle|pop|phd|libre|cosplay|hoenn|sinnoh|unova|kalos|partner|starter|world|violet|indigo|orange|green|average|small|large|super|own|mega|gmax|alola|galar|hisui|paldea|origin|primal|speed|attack|defense|sky|therian|wash|heat|frost|fan|mow|battle|ash|midnight|school|roaming|terastal|stellar|blue|red|yellow|white|black|unbound|eternamax|crowned|hero|sensu|pom-pom|pa-u|baile|stretchy|droopy|curly|combat|blaze|aqua|dada|midday)/,
  )[0];
};

export const getStatColor = (stat: number) => {
  if (stat <= 50) return "#ff4343";
  if (stat <= 85) return "#ffcc00";
  if (stat <= 120) return "#4e9a06";
  if (stat < 150) return "#00c2e8";
  if (stat < 200) return "#d130ff";
  return "#ff006e";
};

export const getEvoCondition = (species: any) => {
  if (!species) return "";

  const conditions: string[] = [];

  // 1. Cấp độ (Level)
  if (species.evoLevel) {
    conditions.push(`Level ${species.evoLevel}`);
  }

  // 2. Chiêu thức (Move) - Ví dụ: Mime Jr. -> Mr. Mime
  if (species.evoMove) {
    conditions.push(`after learning ${species.evoMove}`);
  }

  // 3. Vật phẩm (Item) - Ví dụ: Pikachu -> Raichu (Thunder Stone)
  if (species.evoItem) {
    conditions.push(`use ${species.evoItem}`);
  }

  // 4. Vùng miền (Region) - QUAN TRỌNG: Alola, Galar, Hisui...
  if (species.evoRegion) {
    conditions.push(`in ${species.evoRegion}`);
  }

  // 5. Giới tính (Gender)
  if (species.gender && species.gender !== "N") {
    const genderText = species.gender === "M" ? "Male" : "Female";
    conditions.push(genderText);
  }

  // 6. Thời gian (Time)
  if (species.evoTime) {
    const time = species.evoTime === "day" ? "Daytime" : "Nighttime";
    conditions.push(time);
  }

  // 7. Loại tiến hóa & Điều kiện đặc biệt (Friendship, Location, v.v.)
  if (species.evoType === "trade") {
    conditions.push("Trade");
  } else if (species.evoType === "levelFriendship") {
    conditions.push("High Friendship");
  }

  // 8. Các điều kiện text tự do (Ví dụ: "Near a Mossy Rock")
  if (species.evoCondition) {
    conditions.push(species.evoCondition);
  }

  // 9. Mega Evolution
  if (
    species.isMega ||
    species.isPrimal ||
    species.forme.toLowerCase().startsWith("mega")
  ) {
    if (species.requiredItem) {
      conditions.push(`use ${species.requiredItem}`);
    } else if (species.requiredMove) {
      conditions.push(`learn ${species.requiredMove}`);
    } else if (species.requiredItems && species.requiredItems.length > 0) {
      conditions.push(`use ${species.requiredItems[0]}`);
    }
  }

  // 10. Greninja Ash - Zygarde Complete
  if (
    species.forme.toLowerCase() === "ash" ||
    species.name.toLowerCase() === "zygarde-complete" ||
    species.name.toLowerCase() === "zygarde-10-power-construct" ||
    species.name.toLowerCase() === "zygarde-50-power-construct" ||
    species.forme.toLowerCase() === "hero"
  ) {
    conditions.push(`with ${species.requiredAbility}`);
  }

  // 11. Gigantamax
  if (species.forme.includes("Gmax")) {
    const moveName = species.isGmax || "Gigantamax Factor";
    conditions.push(`use ${moveName}`);
  }

  // 12. Form
  if (["Trash", "Sandy", "Plant"].includes(species.forme)) {
    conditions.push(`in ${species.forme} Cloak`);
  }

  return conditions.length > 0 ? `(${conditions.join(", ")})` : "";
};

export const toShowdownId = (pokeApiId: string): string => {
  if (!pokeApiId) return "";

  const exception = Object.keys(MAPPING_EXCEPTIONS).find(
    (key) => MAPPING_EXCEPTIONS[key] === pokeApiId,
  );
  if (exception) return exception;

  return pokeApiId.toLowerCase().replace(/[^a-z0-9]/g, "");
};

export const toPokeApiId = (showdownId: string): string => {
  if (!showdownId) return "";
  const lowerId = showdownId.toLowerCase();

  if (MAPPING_EXCEPTIONS[lowerId]) {
    return MAPPING_EXCEPTIONS[lowerId];
  }

  return lowerId;
};

export const getFullLanguageName = (lang: string) => {
  const names: Record<string, string> = {
    en: "English",
    ja: "Japanese",
    "ja-Hrkt": "Japanese",
    de: "German",
    fr: "French",
    it: "Italian",
    es: "Spanish",
    ko: "Korean",
    "zh-Hans": "Chinese (Simplified)",
    "zh-Hant": "Chinese (Traditional)",
  };
  return names[lang] || lang.toUpperCase();
};

export const getTypeIcon = (type: string) =>
  `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`;

export const getItemPlaceholder = (itemName: string) => {
  if (/^tm(\d+|-)/i.test(itemName)) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png";
  }
  if (/^tr(\d+|-)/i.test(itemName)) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png";
  }
  if (/ball/i.test(itemName)) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
  }
  return "/icon.png";
};

export const formatStatName = (stat: string) => {
  const map: Record<string, string> = {
    attack: "Attack",
    defense: "Defense",
    speed: "Speed",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    hp: "HP",
  };
  return map[stat] || stat.replace(/-/g, " ");
};

export const getCompetitiveRole = (nature: NatureDetail) => {
  if (!nature.increased_stat)
    return {
      role: "Versatile All-Rounder",
      color: "#64748b",
      desc: "Balanced, suitable for leveling up or for mixed skill sets.",
    };
  const inc = nature.increased_stat?.name;
  const dec = nature.decreased_stat?.name;
  if (inc === "attack" && dec === "special-attack")
    return {
      role: "Physical Sweeper",
      color: "#ef4444",
      desc: "Optimize for maximum physical damage, ignoring magic damage.",
    };
  if (inc === "special-attack" && dec === "attack")
    return {
      role: "Special Nuker",
      color: "#3b82f6",
      desc: "Destroy your opponents with your long-range special skills.",
    };
  if (inc === "speed")
    return {
      role: "Speed Control",
      color: "#10b981",
      desc: "Always take the first turn to gain a tactical advantage.",
    };
  if (inc === "defense" || inc === "special-defense")
    return {
      role: "Tank / Support",
      color: "#f59e0b",
      desc: "Increased resilience and ability to withstand combat.",
    };
  return {
    role: "Tactical Niche",
    color: "#8b5cf6",
    desc: "Designed for specialized tactics to counter opponents.",
  };
};
