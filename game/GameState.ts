import { CardLocation, CardSlot } from "./CardLocations";
import { CardBase } from "./Cards/CardBase";
import { CardWrapper } from "./Cards/CardWrapper";
import { Player } from "./Player";


export class GameState {
  // locations: Map<string, CardLocation> = new Map();
  allCards: Map<string, CardWrapper> = new Map();
  allPlayers: Map<string, Player> = new Map();



  // moveCard(cardId: string, locationId: string) {
  //   const card = this.cards.get(cardId);
  //   const newLocation = this.locations.get(locationId);

  //   if (!card || !newLocation) {
  //     // Handle error: either the card or location does not exist
  //     return;
  //   }

  //   // Remove the card from its current location
  //   if (card.currentSlot) {
  //     const oldLocation = this.locations.get(card.currentSlot);
  //     if (oldLocation) {
  //       oldLocation.removeCard(cardId);
  //     }
  //   }

  //   // Add the card to the new location
  //   newLocation.addCard(cardId);

  //   // Update the card's current location
  //   card.moveTo(locationId);
  // }
}