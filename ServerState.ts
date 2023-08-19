import { Parsed } from './configParser';
import { UserStorageConnector } from './connectors/user/UserStorageConnector';
import { LocalUserStorage } from './connectors/user/LocalUserStorage';
import { SessionStorageConnector } from './connectors/session/SessionStorageConnector';
import { InMemorySessionStorage } from './connectors/session/InMemorySessionStorage';
import { LobbyStorageConnector } from './connectors/lobby/LobbyStorageConnector';
import { InMemoryLobbyStorage } from './connectors/lobby/InMemoryLobbyStorage';

export let userStorage: UserStorageConnector;
export let sessionStorage: SessionStorageConnector;
export let lobbyStorage: LobbyStorageConnector;

export function create(config: Parsed) {
  // Initialize the connectors based on the config
  switch (config.userStorage.type) {
    case 'LocalConnector':
      userStorage = new LocalUserStorage(config.userStorage.filePath);
      break;
    // Here, you can expand to other types like PostgreSQL, etc.
    default:
      throw new Error('User storage type not yet implemented');
  }

  switch (config.sessionStorage.type) {
    case 'InMemory':
      sessionStorage = new InMemorySessionStorage();
      break;
    default:
      throw new Error('Session storage type not yet implemented');
  }

  switch (config.lobbyStorage.type) {
    case 'InMemory':
      lobbyStorage = new InMemoryLobbyStorage();
      break;
    default:
      throw new Error('Lobby storage type not yet implemented');
  }
}
