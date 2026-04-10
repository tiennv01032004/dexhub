import { Dex, Move, Species } from "@pkmn/dex";

export const LOGO =
  "https://res.cloudinary.com/dozfckc33/image/upload/v1773215952/logo_modskl.png";

export const BRAND = "dexhub";

export const POKEAPI_URL = "https://pokeapi.co/api/v2/";

export const MAPPING_EXCEPTIONS: Record<string, string> = {
  // Showdown ID : PokeAPI ID
  "rockruff-dusk": "rockruff-own-tempo",
  lycanroc: "lycanroc-midday",
  "mime jr.": "mime-jr",
  "mr. mime": "mr-mime",
  "mr. mime-galar": "mr-mime-galar",
  "mr. rime": "mr-rime",
  "rockruff-midday": "rockruff",
  "pikachu-original": "pikachu-original-cap",
  "pikachu-hoenn": "pikachu-hoenn-cap",
  "pikachu-sinnoh": "pikachu-sinnoh-cap",
  "pikachu-unova": "pikachu-unova-cap",
  "pikachu-kalos": "pikachu-kalos-cap",
  "pikachu-alola": "pikachu-alola-cap",
  "pikachu-partner": "pikachu-partner-cap",
  "pikachu-starter": "pikachu-starter-cap",
  "pikachu-world": "pikachu-world-cap",
  wormadam: "wormadam-plant",
  // zygarde: "zygarde-50-power-construct",
  // "zygarde-10%": "zygarde-10",
  // "zygarde-50": "zygarde-50-power-construct",
  // "zygarde-50%": "zygarde-50",
  "zygarde-10": "zygarde-10-power-construct",
  "zygarde-50": "zygarde-50-power-construct",
  "zygarde-50-power-construct-50%": "zygarde-50-power-construct",
  "zygarde-10%": "zygarde-10",
  zygarde: "zygarde-50",
  "zygarde-50%": "zygarde-50",
  wishiwashi: "wishiwashi-solo",
  palafin: "palafin-zero",
  urshifu: "urshifu-single-strike",
  "urshifu-gmax": "urshifu-single-strike-gmax",
  pumpkaboo: "pumpkaboo-average",
  gourgeist: "gourgeist-average",
  darmanitan: "darmanitan-standard",
  "darmanitan-galar": "darmanitan-galar-standard",
  toxtricity: "toxtricity-amped",
  "toxtricity-gmax": "toxtricity-amped-gmax",
  minior: "minior-red-meteor",
  "minior-orange": "minior-orange-meteor",
  "minior-yellow": "minior-yellow-meteor",
  "minior-green": "minior-green-meteor",
  "minior-blue": "minior-blue-meteor",
  "minior-indigo": "minior-indigo-meteor",
  "minior-violet": "minior-violet-meteor",
  basculegion: "basculegion-male",
  "basculegion-f": "basculegion-female",
  "maushold-four": "maushold-family-of-four",
  maushold: "maushold-family-of-three",
  "poltchageist-counterfeit": "poltchageist",
  "sinistcha-unremarkable": "sinistcha",
  // miraidon: "miraidon-low-power-mode",
  frillish: "frillish-male",
  jellicent: "jellicent-male",
  pyroar: "pyroar-male",
  indeedee: "indeedee-male",
  "indeedee-f": "indeedee-female",
  oinkologne: "oinkologne-male",
  "oinkologne-f": "oinkologne-female",
  squawkabilly: "squawkabilly-green-plumage",
  "squawkabilly-blue": "squawkabilly-blue-plumage",
  "squawkabilly-yellow": "squawkabilly-yellow-plumage",
  "squawkabilly-white": "squawkabilly-white-plumage",
  "raticate-alola-totem": "raticate-totem-alola",
  "mimikyu-totem": "mimikyu-totem-disguised",
  "mimikyu-busted-totem": "mimikyu-totem-busted",
  "marowak-alola-totem": "marowak-totem",
  "tauros-paldea-combat": "tauros-paldea-combat-breed",
  "tauros-paldea-blaze": "tauros-paldea-blaze-breed",
  "tauros-paldea-aqua": "tauros-paldea-aqua-breed",
  "meowstic-f": "meowstic-female",
  meowstic: "meowstic-male",
  flabébé: "flabebe",
  "farfetch’d-galar": "farfetchd-galar",
  "farfetch’d": "farfetchd",
  "sirfetch’d": "sirfetchd",
  "type: null": "type-null",
  dudunsparce: "dudunsparce-two-segment",
  enamorus: "enamorus-incarnate",
  thundurus: "thundurus-incarnate",
  landorus: "landorus-incarnate",
  tatsugiri: "tatsugiri-curly",
  aegislash: "aegislash-shield",
  giratina: "giratina-altered",
  shaymin: "shaymin-land",
  "cherrim-sunshine": "cherrim",
  // "polteageist-antique": "polteageist",
  // "sinistea-antique": "sinistea",
  morpeko: "morpeko-hangry",
  eiscue: "eiscue-ice",
  deoxys: "deoxys-normal",
  basculin: "basculin-red-striped",
  tornadus: "tornadus-incarnate",
  keldeo: "keldeo-ordinary",
  meloetta: "meloetta-aria",
  "iron bundle": "iron-bundle",
  "great tusk": "great-tusk",
  "brute bonnet": "brute-bonnet",
  "scream tail": "scream-tail",
  "slither wing": "slither-wing",
  "sandy shocks": "sandy-shocks",
  "roaring moon": "roaring-moon",
  "walking wake": "walking-wake",
  "gouging fire": "gouging-fire",
  "raging bolt": "raging-bolt",
  "flutter mane": "flutter-mane",
  "iron valiant": "iron-valiant",
  "iron thorns": "iron-thorns",
  "iron treads": "iron-treads",
  "iron leaves": "iron-leaves",
  "iron boulder": "iron-boulder",
  "iron crown": "iron-crown",
  "iron reliant": "iron-reliant",
  "iron moth": "iron-moth",
  "iron jugulis": "iron-jugulis",
  "iron hands": "iron-hands",
  mimikyu: "mimikyu-disguised",
  "tapu koko": "tapu-koko",
  "tapu lele": "tapu-lele",
  "tapu bulu": "tapu-bulu",
  "tapu fini": "tapu-fini",
  oricorio: "oricorio-baile",
  "ogerpon-cornerstone": "ogerpon-cornerstone-mask",
  "ogerpon-wellspring": "ogerpon-wellspring-mask",
  "ogerpon-hearthflame": "ogerpon-hearthflame-mask",
};

export const DASHED_SPECIES = [
  "ho-oh",
  "porygon-z",
  "jangmo-o",
  "hakamo-o",
  "kommo-o",
  "mr-mime",
  "mime-jr",
  "mr-rime",
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
  "iron-moth",
  "iron-hands",
  "iron-jugulis",
  "iron-treads",
  "iron-bundle",
  "iron-thorns",
  "iron-leaves",
  "iron-boulder",
  "iron-crown",
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

export const SPECIAL_FORMS = [
  // "alola",
  // "galar",
  "hisui",
  "paldea",
  // "mega",
  // "gmax",
  "origin",
  "therian",
  "white",
  "black",
];

export const ALL_POKEMON_DATA = [
  ...new Set(
    Dex.species
      .all()
      .filter((p) => p.num > 0)
      .map((p) => p.baseSpecies),
  ),
].map((name) => {
  const species = Dex.species.get(name);
  return {
    ...species,
    tags: species.tags.map((tag) => {
      if (tag === "Sub-Legendary" || tag === "Restricted Legendary") {
        return "Legendary";
      }
      return tag;
    }),
  };
}) as Species[];

export const TYPES = [
  "All Types",
  ...Dex.types
    .all()
    .filter((t) => t.name !== "Stellar")
    .map((t) => t.name.toLowerCase()),
];
export const GEN = [
  "All Generations",
  ...Array.from({ length: Dex.gen }).map((_, i) => i + 1),
];

export const TAGS = Array.from(
  new Set([
    "All Tags",
    ...Dex.species
      .all()
      .map((s) => s.tags)
      .flat()
      .map((t) => {
        if (t === "Restricted Legendary" || t === "Sub-Legendary") {
          return "Legendary";
        }
        return t;
      }),
  ]),
);

export const MOVES = Dex.moves
  .all()
  .filter((move: Move) => !move.isNonstandard) as Move[];

export const MOVe_CATEGORY = [
  "All Categories",
  "special",
  "physical",
  "status",
];

export const MOVE_LEARN_METHOD_CONFIG = {
  level_up: {
    title: "Moves learnt by level up",
    subtitle: (name: string, version: string) =>
      `${name} learns the following moves in Pokémon ${version} at the levels specified.`,
  },

  tm: {
    title: "Moves learnt by TM",
    subtitle: (name: string, version: string) =>
      `${name} is compatible with these Technical Machines in Pokémon ${version}:`,
  },

  hm: {
    title: "Moves learnt by HM",
    subtitle: (name: string, version: string) =>
      `${name} is compatible with these Hidden Machines in ${version}:`,
  },

  tutor: {
    title: "Move Tutor moves",
    subtitle: (name: string, version: string) =>
      `${name} can be taught these attacks in Pokémon ${version} from move tutors`,
  },

  egg: {
    title: "Egg moves",
    subtitle: (name: string, version: string) =>
      `${name} learns the following moves via breeding or picnics in Pokémon ${version}`,
  },
};

export const EXCLUDED_FORMS = [
  "koraidon-limited-build",
  "koraidon-sprinting-build",
  "koraidon-swimming-build",
  "koraidon-gliding-build",
  "miraidon-low-power-mode",
  "miraidon-drive-mode",
  "miraidon-aquatic-mode",
  "miraidon-glide-mode",
];

export const NAV_ITEMS = [
  { label: "Pokémon", href: "/pokemon" },
  { label: "Items", href: "/items" },
  { label: "Moves", href: "/moves" },
  { label: "Abilities", href: "/abilities" },
  { label: "Natures", href: "/natures" },
  { label: "Blog", href: "/blog" },
  // { label: "Map", href: "/map" },
  // { label: "Trainer", href: "/trainer" },
];
