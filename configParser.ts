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

export type Parsed = BaseConfig<ParsedDuration>;
export type Unparsed = BaseConfig<UnparsedDuration>;

interface StorageBase {
  type: string;
}

// Base interfaces for storage methods
interface InMemory extends StorageBase {
  type: "InMemory";
}

interface LocalConnector extends StorageBase {
  type: "LocalConnector";
  filePath: string;
}

interface FileStore extends StorageBase {
  type: "FileStore";
  filePath: string;
}

interface PostgreSQL extends StorageBase {
  type: "PostgreSQL";
  connection: PostgresConnection;
}

interface PostgresConnection {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  keepAlive?: boolean;
}

// User Storage
interface UserStorageBase<D extends Duration> {
  timeout?: D;
}
type UserStorage<D extends Duration> = UserStorageBase<D> & (InMemory | LocalConnector | PostgreSQL);

// Session Storage
interface SessionStorageBase<D extends Duration> {
  timeout?: D;
}
type SessionStorage<D extends Duration> = SessionStorageBase<D> & (InMemory | LocalConnector | PostgreSQL);

// Lobby Storage
interface LobbyStorageBase<D extends Duration> {
  abandonedTime?: D;
}
type LobbyStorage<D extends Duration> = LobbyStorageBase<D> & (InMemory | LocalConnector | PostgreSQL);


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
    timeout: unparsed.timeout ? parseDuration(unparsed.timeout) : undefined,
  };
}

function parseSessionStorage(unparsed: SessionStorage<UnparsedDuration>): SessionStorage<ParsedDuration> {
  return {
    ...unparsed,
    timeout: unparsed.timeout ? parseDuration(unparsed.timeout) : undefined,
  };
}

function parseLobbyStorage(unparsed: LobbyStorage<UnparsedDuration>): LobbyStorage<ParsedDuration> {
  return {
    ...unparsed,
    abandonedTime: unparsed.abandonedTime ? parseDuration(unparsed.abandonedTime) : undefined,
  };
}

