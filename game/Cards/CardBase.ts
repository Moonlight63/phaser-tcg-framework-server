import { PlayableZone } from "../CardLocations";

export const enum Faction {
  NOVASEVEN,
  ATAVASPAWN,
  ARSFAMILY,
  ALPHAPRIMES,
}

export const Factions: { [key in Faction]: { name: string, description: string } } = {
  [Faction.NOVASEVEN]: {
    name: 'The Sons and Daughters of Nova Seven',
    description: 'The faction of the Nova Seven',
  },
  [Faction.ATAVASPAWN]: {
    name: 'The Perfect Spawn of Atava',
    description: 'The faction of the Atava Spawn',
  },
  [Faction.ARSFAMILY]: {
    name: 'The A.R.S. Family',
    description: 'The faction of the A.R.S. Family',
  },
  [Faction.ALPHAPRIMES]: {
    name: 'The Alpha Primordials',
    description: 'The faction of the Alpha Primordials',
  },
} as const;


export const enum CardType {
  UNIT,
  APEX,
  STAR,
}

export interface IInfluencer {
  influencing: PlayableZone
  influenceEffect(card: CardBase): void
  influence(zone: PlayableZone): void
}


// export class InfluenceEffect {
//   influencing: PlayableZone
//   influenceEffect(card: CardBase): void {

//   }
//   influence(zone: PlayableZone): void {

//   }
// }
// Type guard function
export function isInfluencer<T extends CardBase>(card: T): card is T & IInfluencer {
  return 'influencing' in card;
}

export const CardTypes: { [key in CardType]: { type: string, description: string } } = {
  [CardType.UNIT]: {
    type: 'Unit',
    description: 'A unit card',
  },
  [CardType.APEX]: {
    type: 'Apex',
    description: 'An apex card',
  },
  [CardType.STAR]: {
    type: 'Star',
    description: 'A star card',
  },
} as const;


export abstract class CardBase {
  private modifiers: Map<string, () => number>
  private UUID: string
  constructor(
    private name: string,
    private description: string,
    private faction: Faction,
    private pointValue: number,
    private type: CardType
  ) {
    this.modifiers = new Map()
    this.UUID = this.generateUUID()
  }

  private generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getPoints() {
    let initPoints = this.pointValue
    this.modifiers.forEach((val) => {
      initPoints += val()
    })
    return initPoints
  }

  getUID() {
    return this.UUID
  }
  getName() {
    return this.name
  }
  getDescription() {
    return this.description
  }
  getFaction() {
    return this.faction
  }
  getType() {
    return this.type
  }


  abstract reveal(): void
}


// class TestCard extends CardBase implements InfluenceEffect {
//   influencing: PlayableZone;
//   influenceEffect(card: CardBase): void {
//     throw new Error("Method not implemented.");
//   }
//   influence(zone: PlayableZone): void {
//     throw new Error("Method not implemented.");
//   }
//   reveal(): void {
//     throw new Error("Method not implemented.");
//   }

// }

