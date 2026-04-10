export interface NatureDetail {
  decreased_stat: DecreasedStat;
  hates_flavor: HatesFlavor;
  id: number;
  increased_stat: IncreasedStat;
  likes_flavor: LikesFlavor;
  move_battle_style_preferences: MoveBattleStylePreference[];
  name: string;
  names: Name[];
  pokeathlon_stat_changes: PokeathlonStatChange[];
}

export interface DecreasedStat {
  name: string;
  url: string;
}

export interface HatesFlavor {
  name: string;
  url: string;
}

export interface IncreasedStat {
  name: string;
  url: string;
}

export interface LikesFlavor {
  name: string;
  url: string;
}

export interface MoveBattleStylePreference {
  high_hp_preference: number;
  low_hp_preference: number;
  move_battle_style: MoveBattleStyle;
}

export interface MoveBattleStyle {
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

export interface PokeathlonStatChange {
  max_change: number;
  pokeathlon_stat: PokeathlonStat;
}

export interface PokeathlonStat {
  name: string;
  url: string;
}
