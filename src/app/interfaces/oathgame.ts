export enum Suit {
  Discord = 0,
  Hearth = 1,
  Nomad = 2,
  Arcane = 3,
  Order = 4,
  Beast = 5
}

export enum Oath {
  Supremacy = 0,
  People = 1,
  Devotion = 2,
  Protection = 3,
  Conspiracy = 4
}

export enum PlayerColor {
  Brown = 'Brown',
  Yellow = 'Yellow',
  White = 'White',
  Blue = 'Blue',
  Red = 'Red',
  Chancellor = 'Chancellor'
}

export enum Citizenship {
  Exile = 'Exile',
  Citizen = 'Citizen'
}

export interface Card {
  name: string;
}

export interface Site {
  name: string;
  ruined: boolean;
  cards: Card[];
}

export interface OathGame {
  version: {
    major: string
    minor: string
    patch: string
  };

  gameCount: number;
  chronicleName: string;

  playerCitizenship: Record<PlayerColor, Citizenship>;
  oath: string;
  suitOrder: Suit[];
  sites: Site[];
  world: Card[];
  dispossessed: Card[];
  relics: Card[];
}
