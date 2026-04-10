export interface EvolutionChainDetail {
  baby_trigger_item: Trigger;
  chain: Chain;
  id: number;
}

export interface Chain {
  evolution_details: EvolutionChainDetail[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Species;
}

export interface EvolvesTo {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Species;
}

export interface EvolutionDetail {
  base_form_id: any;
  gender: any;
  held_item: any;
  item: any;
  known_move: any;
  known_move_type: any;
  location: any;
  min_affection: any;
  min_beauty: any;
  min_damage_taken: any;
  min_happiness: any;
  min_level: number;
  min_move_count: any;
  min_steps: any;
  needs_multiplayer: boolean;
  needs_overworld_rain: boolean;
  party_species: any;
  party_type: any;
  region_id: any;
  relative_physical_stats: any;
  time_of_day: string;
  trade_species: any;
  trigger: Trigger;
  turn_upside_down: boolean;
  used_move: any;
}

export interface Trigger {
  name: string;
  url: string;
}

export interface Species {
  name: string;
  url: string;
}
