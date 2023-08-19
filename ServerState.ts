import { Parsed } from './configParser';
import { UserStorageConnector } from './connectors/user/UserStorageConnector';
import { LocalUserStorage } from './connectors/user/LocalUserStorage';
import { SessionStorageConnector } from './connectors/session/SessionStorageConnector';
import { InMemorySessionStorage } from './connectors/session/InMemorySessionStorage';
import { LobbyStorageConnector } from './connectors/lobby/LobbyStorageConnector';
import { InMemoryLobbyStorage } from './connectors/lobby/InMemoryLobbyStorage';

class ServerState {
  userStorage: UserStorageConnector;
  sessionStorage: SessionStorageConnector;
  lobbyStorage: LobbyStorageConnector;

  constructor(config: Parsed) {
    // Initialize the connectors based on the config
    switch (config.userStorage.type) {
      case 'LocalConnector':
        this.userStorage = new LocalUserStorage(config.userStorage.filePath);
        break;
      // Here, you can expand to other types like PostgreSQL, etc.
      default:
        throw new Error('User storage type not yet implemented');
    }

    switch (config.sessionStorage.type) {
      case 'InMemory':
        this.sessionStorage = new InMemorySessionStorage();
        break;
      default:
        throw new Error('Session storage type not yet implemented');
    }

    switch (config.lobbyStorage.type) {
      case 'InMemory':
        this.lobbyStorage = new InMemoryLobbyStorage();
        break;
      default:
        throw new Error('Lobby storage type not yet implemented');
    }
  }
}
const serverState = new ServerState(config);
export default serverState;
