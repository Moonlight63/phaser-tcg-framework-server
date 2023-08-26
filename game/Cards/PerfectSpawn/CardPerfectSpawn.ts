import { CardBase, Faction, CardType } from "../CardBase";


export class CardPerfectSpawn extends CardBase {
  reveal(): void {
    throw new Error("Method not implemented.");
  }
  constructor() {
    super("The Perfect Spawn", "Perfect Spawn", Faction.ATAVASPAWN, 3, CardType.UNIT);
  }
}