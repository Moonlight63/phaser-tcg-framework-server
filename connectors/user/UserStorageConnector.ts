import { User } from "./User";

export abstract class UserStorageConnector {
  abstract getUser(userId: string): Promise<any>;
  abstract getUserByUsername(username: string): Promise<any>;
  abstract setUser(user: any): Promise<void>;
  abstract deleteUser(userId: string): Promise<void>;
  abstract register(userData: any): Promise<User>;
}
