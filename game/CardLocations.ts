// import { CardBase, CardType } from "./Cards/CardBase";

import { CardBase, isInfluencer } from "./Cards/CardBase";
// import type { IInfluencer } from "./Cards/CardBase"

// // interface LocationRule {
// //   maxCards?: number;
// //   allowedTypes?: CardType[];
// //   // Add more rules as needed
// // }

// // export class CardLocation {
// //   id: string;
// //   cardIds: Set<string> = new Set();
// //   adjacentLocations: Set<string> = new Set();
// //   rules: LocationRule;

// //   constructor(id: string, rules: LocationRule = {}) {
// //     this.id = id;
// //     this.rules = rules;
// //   }

// //   addCard(card: CardBase): boolean {
// //     // Check maxCards rule
// //     if (this.rules.maxCards !== undefined && this.cardIds.size >= this.rules.maxCards) {
// //       return false;
// //     }

// //     // Check allowedTypes rule
// //     if (this.rules.allowedTypes && !this.rules.allowedTypes.includes(card.getType())) {
// //       return false;
// //     }

// //     this.cardIds.add(card.getUID());
// //     return true;
// //   }

// //   removeCard(cardId: string) {
// //     this.cardIds.delete(cardId);
// //   }

// //   addAdjacentLocation(locationId: string) {
// //     this.adjacentLocations.add(locationId);
// //   }
// // }




// // Base class for all locations
// abstract class CardLocation {
//   id: string;
//   cardIds: Set<string> = new Set();
//   adjacentLocations: Set<string> = new Set();

//   constructor(id: string) {
//     this.id = id;
//   }

//   abstract canAddCard(cardId: string): boolean;
//   abstract addCard(cardId: string): void;
//   abstract removeCard(cardId: string): void;

//   addAdjacentLocation(locationId: string) {
//     this.adjacentLocations.add(locationId);
//   }
// }


// // Non-playable locations like hand or deck
// class NonPlayableLocation extends CardLocation {
//   canAddCard(cardId: string): boolean {
//     // Implement rules here
//     return true;
//   }

//   addCard(cardId: string) {
//     this.cardIds.add(cardId);
//   }

//   removeCard(cardId: string) {
//     this.cardIds.delete(cardId);
//   }
// }


// // Playable locations on the board
// export class PlayableZone extends CardLocation {
//   influenceLocation: InfluenceLocation;
//   slots: Array<SlotLocation>;

//   constructor(id: string, numberOfSlots: number) {
//     super(id);
//     this.influenceLocation = new InfluenceLocation(`${id}-influence`);
//     this.slots = Array.from({ length: numberOfSlots }, (_, i) => new SlotLocation(`${id}-slot-${i + 1}`));
//   }

//   canAddCard(cardId: string): boolean {
//     // Implement rules here
//     return true;
//   }

//   addCard(cardId: string) {
//     // Implement logic to add card to a specific slot or influence location
//   }

//   removeCard(cardId: string) {
//     // Implement logic to remove card from a specific slot or influence location
//   }
// }

// // Locations within a playable zone that can hold cards
// class SlotLocation extends CardLocation {
//   canAddCard(cardId: string): boolean {
//     // Implement rules here
//     return true;
//   }

//   addCard(cardId: string) {
//     this.cardIds.add(cardId);
//   }

//   removeCard(cardId: string) {
//     this.cardIds.delete(cardId);
//   }
// }

// // Locations within a playable zone that can hold influence cards
// class InfluenceLocation extends CardLocation {
//   canAddCard(cardId: string): boolean {
//     // Implement rules here
//     return true;
//   }

//   addCard(cardId: string) {
//     this.cardIds.add(cardId);
//   }

//   removeCard(cardId: string) {
//     this.cardIds.delete(cardId);
//   }
// }


type GetAdjacentSlotsCallback = () => CardSlot[];

export class CardSlot {
  private card: CardBase | null;
  private parentLocation: CardLocation;
  getAdjacentSlots: GetAdjacentSlotsCallback | null = null;

  constructor(parentLocation: CardLocation, card?: CardBase | null) {
    this.parentLocation = parentLocation;
    this.card = card || null;
  }

  setAdjacentSlotsCallback(callback: GetAdjacentSlotsCallback) {
    this.getAdjacentSlots = callback;
  }

  setCard(card: CardBase | null) {
    this.card = card;
  }

  getCard(): CardBase | null {
    return this.card;
  }

  getLocation(): CardLocation {
    return this.parentLocation;
  }
}

abstract class CardLocation {
  id: string;
  slots: CardSlot[] = [];

  constructor(id: string) {
    this.id = id;
  }

  abstract addCard(card: CardBase, slotIndex: number): boolean;
  abstract removeCard(cardId: string): boolean;
}

class BasicContainer extends CardLocation {
  addCard(card: CardBase, slotIndex?: number): boolean {
    if (slotIndex !== undefined && (slotIndex < 0 || slotIndex > this.slots.length)) {
      return false;
    }
    const newSlot = new CardSlot(this, card);
    if (slotIndex !== undefined) {
      this.slots.splice(slotIndex, 0, newSlot);
    } else {
      this.slots.push(newSlot);
    }
    return true;
  }

  removeCard(cardId: string): boolean {
    const index = this.slots.findIndex(slot => slot.getCard()?.getUID() === cardId);
    if (index !== -1) {
      this.slots.splice(index, 1);
      return true;
    }
    return false;
  }
}
export class Hand extends BasicContainer {

}

export class Deck extends BasicContainer {

}

export class Discard extends BasicContainer {

}

export class TheVoid extends BasicContainer {

}

export class EvoPile extends BasicContainer {

}



export abstract class InfluencableZone extends CardLocation {
  private influencers: CardSlot[] = []

  addInfluence(card: CardBase): boolean {
    if (isInfluencer(card)) {
      this.influencers.push(new CardSlot(this, card));
      return true;
    }
    return false
  }

  removeInfluence(cardId: string): boolean {
    const index = this.influencers.findIndex(slot => slot.getCard()?.getUID() === cardId);
    if (index !== -1) {
      this.influencers.splice(index, 1);
      return true;
    }
    return false;
  }
}

export class Skirmish extends InfluencableZone {

  constructor(id: string, private numSlots: number) {
    super(id);
    for (let i = 0; i < numSlots; i++) {
      this.slots.push(new CardSlot(this));
    }
  }

  addCard(card: CardBase, slotIndex?: number): boolean {
    if (slotIndex !== undefined && (slotIndex < 0 || slotIndex >= this.numSlots)) {
      return false;
    }
    if (slotIndex === undefined) {
      slotIndex = this.slots.findIndex(slot => slot.getCard() === null);
      if (slotIndex === -1) {
        return false;
      }
    }
    if (this.slots[slotIndex].getCard() !== null) {
      return false;
    }
    this.slots[slotIndex].setCard(card);
    return true;
  }

  removeCard(cardId: string): boolean {
    const slot = this.slots.find(slot => slot.getCard()?.getUID() === cardId);
    if (slot !== undefined) {
      slot.setCard(null);
      return true;
    }
    return false;
  }
}

export class ExtraSlots extends InfluencableZone {
  private getAdjacentSlotsCallback: GetAdjacentSlotsCallback | null = null;

  setGetAdjacentSlotsCallback(callback: GetAdjacentSlotsCallback): void {
    this.getAdjacentSlotsCallback = callback;
  }

  addCard(card: CardBase, slotIndex?: number): boolean {
    if (slotIndex !== undefined && (slotIndex < 0 || slotIndex >= this.slots.length)) {
      return false;
    }
    if (this.getAdjacentSlotsCallback === null) return false;
    const newSlot = new CardSlot(this, card);
    newSlot.setAdjacentSlotsCallback(this.getAdjacentSlotsCallback);
    if (slotIndex !== undefined) {
      this.slots.splice(slotIndex, 0, newSlot);
    } else {
      this.slots.push(newSlot);
    }
    return true;
  }

  removeCard(cardId: string): boolean {
    const index = this.slots.findIndex(slot => slot.getCard()?.getUID() === cardId);
    if (index !== -1) {
      this.slots.splice(index, 1)[0].setCard(null);
      return true;
    }
    return false;
  }
}

