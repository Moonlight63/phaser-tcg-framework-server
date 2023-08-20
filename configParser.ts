import fs from 'fs';
import Moment from 'moment';

// Type Definitions:

type Duration = UnparsedDuration | ParsedDuration;
type UnparsedDuration = string;
type ParsedDuration = number;

interface EnvironmentalConfig {
  secret: string;
  listenOn: number | string;
  basePath: string;
  version: string;
}

interface BaseConfig<D extends Duration> {
  environmental: EnvironmentalConfig;
  userStorage: UserStorage<D>;
  sessionStorage: SessionStorage<D>;
  lobbyStorage: LobbyStorage<D>;
  // lobbyDefaults?: LobbyConfig.Defaults; // Assuming you'll have a LobbyConfig file with Defaults type
}

export type Unparsed = BaseConfig<UnparsedDuration>;
// export type Parsed = BaseConfig<ParsedDuration>;
export type Parsed = {
  environmental: EnvironmentalConfig;
  userStorage: UserStorageOptions[Unparsed['userStorage']['type']];
  sessionStorage: SessionStorageOptions[Unparsed['sessionStorage']['type']];
  lobbyStorage: LobbyStorageOptions[Unparsed['lobbyStorage']['type']];

  // lobbyDefaults?: LobbyConfig.Defaults;
};


interface StorageBase {
  type: string;
}

// Session Storage
interface SessionStorageMethods {
  InMemory: StorageBase & {
    type: "InMemory"
  };

  FileStore: StorageBase & {
    type: "FileStore";
    path: string;
  };

  PostgreSQL: StorageBase & {
    type: "PostgreSQL";
    connection: PostgresConnection;
  };
}
interface SessionStorageBase<D extends Duration> {
  /**
   * Session time to live in seconds. Defaults to `3600`
  */
  ttl?: number | undefined;

  /**
   * The number of retries to get session data from a session file. Defaults to `5`
   */
  retries?: number | undefined;

  /**
   * The exponential factor to use for retry. Defaults to `1`
   */
  factor?: number | undefined;

  /**
   * The number of milliseconds before starting the first retry. Defaults to `50`
   */
  minTimeout?: number | undefined;

  /**
   * The maximum number of milliseconds between two retries. Defaults to `100`
   */
  maxTimeout?: number | undefined;
}
type SessionStorage<D extends Duration, T extends keyof SessionStorageMethods = keyof SessionStorageMethods> = SessionStorageBase<D> & SessionStorageMethods[T];
export type SessionStorageOptions = {
  [K in keyof SessionStorageMethods]: SessionStorage<ParsedDuration, K>;
}
// User Storage
interface UserStorageMethods {
  InMemory: StorageBase & {
    type: "InMemory"
  };

  FileStore: StorageBase & {
    type: "FileStore";
    path: string;
  };

  PostgreSQL: StorageBase & {
    type: "PostgreSQL";
    connection: PostgresConnection;
  };
}
interface UserStorageBase<D extends Duration> {
}
type UserStorage<D extends Duration, T extends keyof UserStorageMethods = keyof UserStorageMethods> = UserStorageBase<D> & UserStorageMethods[T];
export type UserStorageOptions = {
  [K in keyof UserStorageMethods]: UserStorage<ParsedDuration, K>;
}

// Lobby Storage
interface LobbyStorageMethods {
  InMemory: StorageBase & {
    type: "InMemory"
  };

  FileStore: StorageBase & {
    type: "FileStore";
    path: string;
  };

  PostgreSQL: StorageBase & {
    type: "PostgreSQL";
    connection: PostgresConnection;
  };
}
interface LobbyStorageBase<D extends Duration> {
  abandonedTime?: D;
}
type LobbyStorage<D extends Duration, T extends keyof LobbyStorageMethods = keyof LobbyStorageMethods> = LobbyStorageBase<D> & LobbyStorageMethods[T];
export type LobbyStorageOptions = {
  [K in keyof LobbyStorageMethods]: LobbyStorage<ParsedDuration, K>;
}

interface PostgresConnection {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  keepAlive?: boolean;
}

// Parser Functions:

const environmental: (keyof EnvironmentalConfig)[] = [
  "secret",
  "listenOn",
  "basePath",
  "version",
];

const parseDuration = (unparsed: UnparsedDuration): ParsedDuration =>
  Moment.duration(unparsed).asMilliseconds();

export const pullFromEnvironment = (config: Parsed): Parsed => {
  for (const name of environmental) {
    const envName = `CQ_${name
      .split(/(?=[A-Z])/)
      .join("_")
      .toUpperCase()}`;
    const value = process.env[envName];
    if (value !== undefined) {
      config.environmental[name] = value;
    }
  }
  return config;
};

export function parseConfig(filePath: string): Parsed {
  const rawConfig = fs.readFileSync(filePath, 'utf-8');
  const unparsedConfig: Unparsed = JSON.parse(rawConfig);
  return parse(unparsedConfig);
}

function parse(config: Unparsed): Parsed {
  return pullFromEnvironment({
    ...config,
    userStorage: parseUserStorage(config.userStorage),
    sessionStorage: parseSessionStorage(config.sessionStorage),
    lobbyStorage: parseLobbyStorage(config.lobbyStorage),
    // lobbyDefaults: config.lobbyDefaults, 
  });
}

function parseUserStorage(unparsed: UserStorage<UnparsedDuration>): UserStorage<ParsedDuration> {
  return {
    ...unparsed,
    // timeout: unparsed.timeout ? parseDuration(unparsed.timeout) : undefined,
  };
}

function parseSessionStorage(unparsed: SessionStorage<UnparsedDuration>): SessionStorage<ParsedDuration> {
  return {
    ...unparsed,
    // timeout: unparsed.timeout ? parseDuration(unparsed.timeout) : undefined,
  };
}

function parseLobbyStorage(unparsed: LobbyStorage<UnparsedDuration>): LobbyStorage<ParsedDuration> {
  return {
    ...unparsed,
    abandonedTime: unparsed.abandonedTime ? parseDuration(unparsed.abandonedTime) : undefined,
  };
}

