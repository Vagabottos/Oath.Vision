import { PlayerColor } from './oathgame';

export interface Chronicle {
  id?: string;
  parentId?: string;

  timestamp: number;
  seed: string;
  desc: string;

  playerNames: Record<PlayerColor, string>;
  playerActions: Record<PlayerColor, string>;
}

export function CreateChronicle(): Chronicle {
  return {
    timestamp: Date.now(),
    seed: '',
    desc: '',

    playerNames: {
      [PlayerColor.Chancellor]: '',
      [PlayerColor.Blue]: '',
      [PlayerColor.Brown]: '',
      [PlayerColor.Red]: '',
      [PlayerColor.White]: '',
      [PlayerColor.Yellow]: '',
    },

    playerActions: {
      [PlayerColor.Chancellor]: '',
      [PlayerColor.Blue]: '',
      [PlayerColor.Brown]: '',
      [PlayerColor.Red]: '',
      [PlayerColor.White]: '',
      [PlayerColor.Yellow]: '',
    }
  };
}
