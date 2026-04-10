export interface TypeDetail {
  damage_relations: DamageRelations;
  game_indices: Index[];
  generation: Generation2;
  id: number;
  move_damage_class: MoveDamageClass;
  moves: Mfe[];
  name: string;
  names: Name[];
  past_damage_relations: DamageRelations[];
  pokemon: Pokemon[];
  sprites: Sprites;
}

export interface DamageRelations {
  double_damage_from: DoubleDamageFrom[];
  double_damage_to: DoubleDamageTo[];
  half_damage_from: HalfDamageFrom[];
  half_damage_to: HalfDamageTo[];
  no_damage_from: NoDamageFrom[];
  no_damage_to: NoDamageTo[];
}

export interface DoubleDamageFrom {
  name: string;
  url: string;
}

export interface DoubleDamageTo {
  name: string;
  url: string;
}

export interface HalfDamageFrom {
  name: string;
  url: string;
}

export interface HalfDamageTo {
  name: string;
  url: string;
}

export interface NoDamageTo {
  name: string;
  url: string;
}

export interface NoDamageFrom {
  name: string;
  url: string;
}

export interface Index {
  game_index: number;
  generation: Generation;
}

export interface Generation {
  name: string;
  url: string;
}

export interface Generation2 {
  name: string;
  url: string;
}

export interface MoveDamageClass {
  name: string;
  url: string;
}

export interface Mfe {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface Pokemon {
  pokemon: Pokemon2;
  slot: number;
}

export interface Pokemon2 {
  name: string;
  url: string;
}

export interface Sprites {
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-ix": GenerationIx;
  "generation-v": GenerationV;
  "generation-vi": GenerationVi;
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface GenerationIii {
  colosseum: Colosseum;
  emerald: Emerald;
  "firered-leafgreen": FireredLeafgreen;
  "ruby-sapphire": RubySapphire;
  xd: Xd;
}

export interface Colosseum {
  name_icon: string;
  symbol_icon: string | null;
}

export interface Emerald {
  name_icon: string;
  symbol_icon: string | null;
}

export interface FireredLeafgreen {
  name_icon: string;
  symbol_icon: string | null;
}

export interface RubySapphire {
  name_icon: string;
  symbol_icon: string | null;
}

export interface Xd {
  name_icon: string;
  symbol_icon: string | null;
}

export interface GenerationIv {
  "diamond-pearl": DiamondPearl;
  "heartgold-soulsilver": HeartgoldSoulsilver;
  platinum: Platinum;
}

export interface DiamondPearl {
  name_icon: string;
  symbol_icon: string | null;
}

export interface HeartgoldSoulsilver {
  name_icon: string;
  symbol_icon: string | null;
}

export interface Platinum {
  name_icon: string;
  symbol_icon: string | null;
}

export interface GenerationIx {
  "scarlet-violet": ScarletViolet;
}

export interface ScarletViolet {
  name_icon: string;
  symbol_icon: string;
}

export interface GenerationV {
  "black-2-white-2": Black2White2;
  "black-white": BlackWhite;
}

export interface Black2White2 {
  name_icon: string;
  symbol_icon: string | null;
}

export interface BlackWhite {
  name_icon: string;
  symbol_icon: string | null;
}

export interface GenerationVi {
  "omega-ruby-alpha-sapphire": OmegaRubyAlphaSapphire;
  "x-y": XY;
}

export interface OmegaRubyAlphaSapphire {
  name_icon: string;
  symbol_icon: string | null;
}

export interface XY {
  name_icon: string;
  symbol_icon: string | null;
}

export interface GenerationVii {
  "lets-go-pikachu-lets-go-eevee": LetsGoPikachuLetsGoEevee;
  "sun-moon": SunMoon;
  "ultra-sun-ultra-moon": UltraSunUltraMoon;
}

export interface LetsGoPikachuLetsGoEevee {
  name_icon: string;
  symbol_icon: string;
}

export interface SunMoon {
  name_icon: string;
  symbol_icon: string | null;
}

export interface UltraSunUltraMoon {
  name_icon: string;
  symbol_icon: string | null;
}

export interface GenerationViii {
  "brilliant-diamond-shining-pearl": BrilliantDiamondShiningPearl;
  "legends-arceus": LegendsArceus;
  "sword-shield": SwordShield;
}

export interface BrilliantDiamondShiningPearl {
  name_icon: string;
  symbol_icon: string;
}

export interface LegendsArceus {
  name_icon: string;
  symbol_icon: string;
}

export interface SwordShield {
  name_icon: string;
  symbol_icon: string;
}
