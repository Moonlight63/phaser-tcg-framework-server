import { Parsed } from './configParser';
import { UserStorageConnector } from './connectors/user/UserStorageConnector';
import { LocalUserStorage } from './connectors/user/LocalUserStorage';
import { SessionStorageConnector } from './connectors/session/SessionStorageConnector';
import { InMemorySessionStorage } from './connectors/session/InMemorySessionStorage';
import { LobbyStorageConnector } from './connectors/lobby/LobbyStorageConnector';
import { InMemoryLobbyStorage } from './connectors/lobby/InMemoryLobbyStorage';

let _userStorage: UserStorageConnector;
let _sessionStorage: SessionStorageConnector;
let _lobbyStorage: LobbyStorageConnector;

Object.defineProperty(exports, 'userStorage', {
  get: function() { return _userStorage; },
  configurable: false
});

Object.defineProperty(exports, 'sessionStorage', {
  get: function() { return _sessionStorage; },
  configurable: false
});

Object.defineProperty(exports, 'lobbyStorage', {
  get: function() { return _lobbyStorage; },
  configurable: false
});

export function create(config: Parsed) {
  // Initialize the connectors based on the config
  switch (config.userStorage.type) {
    case 'LocalConnector':
      _userStorage = new LocalUserStorage(config.userStorage.filePath);
      break;
    // Here, you can expand to other types like PostgreSQL, etc.
    default:
      throw new Error('User storage type not yet implemented');
  }

  switch (config.sessionStorage.type) {
    case 'InMemory':
      _sessionStorage = new InMemorySessionStorage();
      break;
    default:
      throw new Error('Session storage type not yet implemented');
  }

  switch (config.lobbyStorage.type) {
    case 'InMemory':
      _lobbyStorage = new InMemoryLobbyStorage();
      break;
    default:
      throw new Error('Lobby storage type not yet implemented');
  }
}
