export abstract class LobbyStorageConnector {
  abstract getLobby(lobbyId: string): Promise<any>;
  abstract setLobby(data: any): Promise<void>;
  abstract deleteLobby(lobbyId: string): Promise<void>;
  // Add any other lobby-specific methods here
}