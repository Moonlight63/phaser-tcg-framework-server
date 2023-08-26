import { CardAsteroidSpawn } from './AsteroidSpawn/CardAsteroidSpawn';
import { CardPerfectSpawn } from './PerfectSpawn/CardPerfectSpawn';



const cardMapping = {
  AsteroidSpawn: CardAsteroidSpawn,
  PerfectSpawn: CardPerfectSpawn,
} as const;

export type CardId = keyof typeof cardMapping;

export function createCard(cardId: CardId) {
  const CardClass = cardMapping[cardId];
  if (CardClass) {
    return new CardClass();
  }
  return null;
}
