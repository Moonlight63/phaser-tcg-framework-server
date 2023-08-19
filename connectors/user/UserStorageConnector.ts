abstract class UserStorageConnector {
  abstract authenticate(username: string, password: string): Promise<User | null>;
  abstract register(userData: any): Promise<User>;
  abstract retrieveUser(criteria: any): Promise<User | null>;
  abstract updateUser(userId: string, updates: any): Promise<void>;
  abstract initializeAuthentication(app: Express.Application): void;
}