export interface ItemDetail {
  attributes: Attribute[];
  baby_trigger_for: boolean;
  category: Category;
  cost: number;
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  fling_effect: FlingEffect;
  fling_power: number;
  game_indices: Index[];
  held_by_pokemon: HeldByPokemon[];
  id: number;
  machines: Machines[];
  name: string;
  names: Name[];
  sprites: Sprites;
}

export interface Attribute {
  name: string;
  url: string;
}

export interface Category {
  name: string;
  url: string;
}

export interface EffectEntry {
  effect: string;
  language: Language;
  short_effect: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  language: Language;
  text: string;
  version_group: VersionGroup;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface FlingEffect {
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

export interface HeldByPokemon {
  pokemon: Pokemon;
  version_details: VersionDetail[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface VersionDetail {
  rarity: number;
  version: Version;
}

export interface Version {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Sprites {
  default: string;
}

export interface Machines {
  machine: Machine;
  version_group: VersionGroup;
}

export interface Machine {
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}
