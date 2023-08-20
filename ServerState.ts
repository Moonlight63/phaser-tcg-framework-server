import { Parsed } from './configParser';
import { UserStorageConnector } from './connectors/user/UserStorageConnector';
import { LocalUserStorage } from './connectors/user/LocalUserStorage';
import { SessionStorageConnector } from './connectors/session/SessionStorageConnector';
import { FileSessionStorage } from './connectors/session/FileSessionStore';
import { LobbyStorageConnector } from './connectors/lobby/LobbyStorageConnector';
import { InMemoryLobbyStorage } from './connectors/lobby/InMemoryLobbyStorage';


class StateFactory {
  private static _userStorage: UserStorageConnector;
  private static _sessionStorage: SessionStorageConnector;
  private static _lobbyStorage: LobbyStorageConnector;

  static get UserStorage() {
    return this._userStorage;
  }

  static get SessionStorage() {
    return this._sessionStorage;
  }

  static get LobbyStorage() {
    return this._lobbyStorage;
  }

  static create(config: Parsed) {
    // Initialize the connectors based on the config
    switch (config.userStorage.type) {
      case 'FileStore':
        StateFactory._userStorage = new LocalUserStorage(config.userStorage);
        break;
      // Here, you can expand to other types like PostgreSQL, etc.
      default:
        throw new Error('User storage type not yet implemented');
    }

    switch (config.sessionStorage.type) {
      case 'FileStore':
        StateFactory._sessionStorage = new FileSessionStorage(config.sessionStorage);
        break;
      default:
        throw new Error('Session storage type not yet implemented');
    }

    switch (config.lobbyStorage.type) {
      case 'InMemory':
        StateFactory._lobbyStorage = new InMemoryLobbyStorage();
        break;
      default:
        throw new Error('Lobby storage type not yet implemented');
    }
  }
}

// Named exports for each static getter.
export const UserStorage = StateFactory.UserStorage;
export const SessionStorage = StateFactory.SessionStorage;
export const LobbyStorage = StateFactory.LobbyStorage;
export function CreateState(config: Parsed) {
  StateFactory.create(config);
}