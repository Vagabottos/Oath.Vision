
import * as CardToIndexJson from '../../assets/json/cards.json';
import * as CardSuitJson from '../../assets/json/cardsuits.json';
import { Suit } from './oathgame';

export const CardName = (CardToIndexJson as any).default || CardToIndexJson;
export const CardSuits: Record<string, Suit> = (CardSuitJson as any).default || CardSuitJson;

export const CardNameIndexes = Object.keys(CardName)
  .reduce((prev, cur) => {
    prev[CardName[cur]] = cur;
    return prev;
  }, {});

export function determineTypeForCard(cardName: string): string {
  const cardIndex = CardName[cardName];
  if (cardIndex <= 197) { return 'world'; }
  if (cardIndex <= 209) { return 'edifice'; }
  if (cardIndex <= 214) { return 'world'; }
  if (cardIndex <= 216) { return ''; }
  if (cardIndex <= 237) { return 'relic'; }
  return '';
}
