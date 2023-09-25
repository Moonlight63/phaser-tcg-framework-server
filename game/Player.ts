import { Deck, Discard, ExtraSlots, Hand, InfluenceCards, Skirmish, TheVoid } from "./CardLocations";

export class Player {
  private points: number = 0;
  private hand: Hand;
  private deck: Deck;
  private graveyard: Discard;
  private skirmishOne: Skirmish;
  private skirmishTwo: Skirmish;
  private extraSlots: ExtraSlots;
  private cardVoid: TheVoid;
  private influence: InfluenceCards;

  constructor(private id: string) {
    this.hand = new Hand(this.id + "_hand");
    this.deck = new Deck(this.id + "_deck");
    this.graveyard = new Discard(this.id + "_graveyard");
    this.skirmishOne = new Skirmish(this.id + "_skirmish1", 4);
    this.skirmishTwo = new Skirmish(this.id + "_skirmish2", 3);
    this.extraSlots = new ExtraSlots(this.id + "_extraslots");
    this.cardVoid = new TheVoid(this.id + "_void");
    this.influence = new InfluenceCards(this.id + "_influence");

    this.extraSlots.setGetAdjacentSlotsCallback(() => {
      return [this.skirmishOne.slots[0], this.skirmishTwo.slots[0]];
    })
    this.skirmishOne.slots[0].setAdjacentSlotsCallback(() => {
      return [...this.extraSlots.slots, this.skirmishOne.slots[1], this.skirmishTwo.slots[0]];
    })
    this.skirmishOne.slots[1].setAdjacentSlotsCallback(() => {
      return [this.skirmishOne.slots[0], this.skirmishOne.slots[2], this.skirmishTwo.slots[0], this.skirmishTwo.slots[1]];
    })
    this.skirmishOne.slots[2].setAdjacentSlotsCallback(() => {
      return [this.skirmishOne.slots[1], this.skirmishOne.slots[3], this.skirmishTwo.slots[1], this.skirmishTwo.slots[2]];
    })
    this.skirmishOne.slots[3].setAdjacentSlotsCallback(() => {
      return [this.skirmishOne.slots[2], this.skirmishTwo.slots[2]];
    })

    this.skirmishTwo.slots[0].setAdjacentSlotsCallback(() => {
      return [...this.extraSlots.slots, this.skirmishTwo.slots[1], this.skirmishOne.slots[0], this.skirmishOne.slots[1]];
    })
    this.skirmishTwo.slots[1].setAdjacentSlotsCallback(() => {
      return [this.skirmishTwo.slots[0], this.skirmishTwo.slots[2], this.skirmishOne.slots[1], this.skirmishOne.slots[2]];
    })
    this.skirmishTwo.slots[2].setAdjacentSlotsCallback(() => {
      return [this.skirmishTwo.slots[1], this.skirmishOne.slots[2], this.skirmishOne.slots[3]];
    })
  }
}