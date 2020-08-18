import { PlayerColor } from './oathgame';

export interface Chronicle {
  seed: string;
  desc: string;
  parent?: string;

  playerNames: Record<PlayerColor, string>;
  playerActions: Record<PlayerColor, string>;
}
