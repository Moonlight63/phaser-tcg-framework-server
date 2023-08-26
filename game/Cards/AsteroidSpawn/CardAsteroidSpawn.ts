import { CardBase, CardType, Faction } from "../CardBase";


export class CardAsteroidSpawn extends CardBase {
  reveal(): void {
    throw new Error("Method not implemented.");
  }
  constructor() {
    super("Asteroid Spawn", "Destroy one random unit from each opponent", Faction.ATAVASPAWN, 3, CardType.UNIT);
  }
}