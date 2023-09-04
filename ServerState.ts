import { Parsed } from './configParser';
import { UserStorageConnector } from './connectors/user/UserStorageConnector';
import { LocalUserStorage } from './connectors/user/LocalUserStorage';
import { SessionStorageConnector } from './connectors/session/SessionStorageConnector';
import { FileSessionStorage } from './connectors/session/FileSessionStore';
import { LobbyStorageConnector } from './connectors/lobby/LobbyStorageConnector';
import { InMemoryLobbyStorage } from './connectors/lobby/InMemoryLobbyStorage';
import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from './events/Events';


let _userStorage: UserStorageConnector;
let _sessionStorage: SessionStorageConnector;
let _lobbyStorage: LobbyStorageConnector;
let _socket: Server<ClientToServerEvents, ServerToClientEvents>;

export const UserStorage = () => _userStorage;
export const SessionStorage = () => _sessionStorage;
export const LobbyStorage = () => _lobbyStorage;
export const IO = () => _socket;


export async function CreateState(config: Parsed) {
  console.log("Creating state...");
  // Initialize the connectors based on the config
  switch (config.userStorage.type) {
    case 'FileStore':
      console.log("Creating user storage...");
      _userStorage = new LocalUserStorage(config.userStorage);
      console.log("User storage created.");
      break;
    // Here, you can expand to other types like PostgreSQL, etc.
    default:
      throw new Error('User storage type not yet implemented');
  }

  switch (config.sessionStorage.type) {
    case 'FileStore':
      console.log("Creating session storage...");
      _sessionStorage = new FileSessionStorage(config.sessionStorage);
      console.log("Session storage created.");
      break;
    default:
      throw new Error('Session storage type not yet implemented');
  }

  switch (config.lobbyStorage.type) {
    case 'InMemory':
      console.log("Creating lobby storage...");
      _lobbyStorage = new InMemoryLobbyStorage();
      console.log("Lobby storage created.");
      break;
    default:
      throw new Error('Lobby storage type not yet implemented');
  }

  _socket = new Server<ClientToServerEvents, ServerToClientEvents>();

  console.log("State created.");
}
