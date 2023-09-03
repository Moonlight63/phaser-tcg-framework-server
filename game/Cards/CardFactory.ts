import { CardAsteroidSpawn } from './AsteroidSpawn/CardAsteroidSpawn';
import { CardPerfectSpawn } from './PerfectSpawn/CardPerfectSpawn';

import { CardWrapper } from './CardWrapper';

const cardMapping = {
  AsteroidSpawn: CardAsteroidSpawn,
  PerfectSpawn: CardPerfectSpawn,
} as const;

export type CardId = keyof typeof cardMapping;

export function createCard(cardId: CardId) {
  const CardClass = cardMapping[cardId];
  if (CardClass) {
    return new CardWrapper(new CardClass());
  }
  return null;
}
