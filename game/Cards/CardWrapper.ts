import { CardSlot } from "../CardLocations";
import { CardBase } from "./CardBase";

export class CardWrapper {
  private wrappedCard: CardBase;
  currentSlot: CardSlot | null = null;

  constructor(wrappedCard: CardBase) {
    this.wrappedCard = wrappedCard;
  }

  moveTo(slot: CardSlot) {
    this.currentSlot = slot;
  }

  card(): CardBase {
    return this.wrappedCard;
  }

}