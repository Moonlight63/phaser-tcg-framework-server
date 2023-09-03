import { CardBase } from "./Cards/CardBase";


export class GameState {
  locations: Map<string, Location> = new Map();
  cards: Map<string, CardBase> = new Map();

  moveCard(cardId: string, locationId: string) {
    const card = this.cards.get(cardId);
    const newLocation = this.locations.get(locationId);

    if (!card || !newLocation) {
      // Handle error: either the card or location does not exist
      return;
    }

    // Remove the card from its current location
    if (card.currentLocationId) {
      const oldLocation = this.locations.get(card.currentLocationId);
      if (oldLocation) {
        oldLocation.removeCard(cardId);
      }
    }

    // Add the card to the new location
    newLocation.addCard(cardId);

    // Update the card's current location
    card.moveTo(locationId);
  }
}