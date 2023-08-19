import { LobbyStorageConnector } from './LobbyStorageConnector';

export class InMemoryLobbyStorage extends LobbyStorageConnector {
  private storage: Map<string, any> = new Map();

  async getLobby(lobbyId: string): Promise<any> {
    return this.storage.get(lobbyId) || null;
  }

  async setLobby(lobby: any): Promise<void> {
    this.storage.set(lobby.id, lobby);
  }

  async deleteLobby(lobbyId: string): Promise<void> {
    this.storage.delete(lobbyId);
  }
}