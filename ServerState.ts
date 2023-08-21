import { Parsed } from './configParser';
import { UserStorageConnector } from './connectors/user/UserStorageConnector';
import { LocalUserStorage } from './connectors/user/LocalUserStorage';
import { SessionStorageConnector } from './connectors/session/SessionStorageConnector';
import { FileSessionStorage } from './connectors/session/FileSessionStore';
import { LobbyStorageConnector } from './connectors/lobby/LobbyStorageConnector';
import { InMemoryLobbyStorage } from './connectors/lobby/InMemoryLobbyStorage';


let UserStorage: UserStorageConnector;
let SessionStorage: SessionStorageConnector;
let LobbyStorage: LobbyStorageConnector;

async function create(config: Parsed) {
  console.log("Creating state...");
  // Initialize the connectors based on the config
  switch (config.userStorage.type) {
    case 'FileStore':
      console.log("Creating user storage...");
      UserStorage = new LocalUserStorage(config.userStorage);
      console.log("User storage created.");
      break;
    // Here, you can expand to other types like PostgreSQL, etc.
    default:
      throw new Error('User storage type not yet implemented');
  }

  switch (config.sessionStorage.type) {
    case 'FileStore':
      console.log("Creating session storage...");
      SessionStorage = new FileSessionStorage(config.sessionStorage);
      console.log("Session storage created.");
      break;
    default:
      throw new Error('Session storage type not yet implemented');
  }

  switch (config.lobbyStorage.type) {
    case 'InMemory':
      console.log("Creating lobby storage...");
      LobbyStorage = new InMemoryLobbyStorage();
      console.log("Lobby storage created.");
      break;
    default:
      throw new Error('Lobby storage type not yet implemented');
  }
  console.log("State created.");
}

export { UserStorage, SessionStorage, LobbyStorage, create as CreateState };
