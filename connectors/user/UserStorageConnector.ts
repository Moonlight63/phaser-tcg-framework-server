import { User, UserPublic } from "./User";

export abstract class UserStorageConnector {
  abstract getUser(userId: string): Promise<UserPublic | null>;
  abstract getFullUser(userId: string): Promise<User | null>;
  abstract getUserByUsername(username: string): Promise<UserPublic | null>;
  abstract setUser(user: User): Promise<void>;
  abstract deleteUser(userId: string): Promise<void>;
  abstract register(userData: any): Promise<UserPublic | null>;
}
