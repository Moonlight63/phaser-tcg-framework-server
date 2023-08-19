import { User } from "./User";

export abstract class UserStorageConnector {
  abstract getUser(userId: string): Promise<any>;
  abstract setUser(user: any): Promise<void>;
  abstract deleteUser(userId: string): Promise<void>;
  abstract authenticate(username: string, password: string): Promise<User | null>;
  abstract register(userData: any): Promise<User>;
  abstract initialize(app: Express.Application): void;
}
