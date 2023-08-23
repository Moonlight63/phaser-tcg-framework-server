import fs from 'fs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserStorageConnector } from './UserStorageConnector';
import { User } from './User';

export class LocalUserStorage extends UserStorageConnector {
  private filePath: string;

  constructor(config: any) {
    super();
    this.filePath = config.filePath;

  }

  async getUserByUsername(username: string): Promise<any> {
    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    for (const userId in data.users) {
      if (data.users[userId].username === username) {
        return data.users[userId];
      }
    }
    return null;
  }

  async getUser(userId: string): Promise<any> {
    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    return data.users[userId] || null;
  }

  async setUser(user: any): Promise<void> {
    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    data.users[user.id] = user;
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }

  async deleteUser(userId: string): Promise<void> {
    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    delete data.users[userId];
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }

  async register(userData: any): Promise<User> {
    const user = await this.getUserByUsername(userData.username);
    if (user) {
      throw new Error('User already exists');
    }

    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    const userId = Date.now().toString();
    const newUser = {
      id: userId,
      username: userData.username,
      password: userData.password,
    };
    data.users[userId] = newUser;
    fs.writeFileSync(this.filePath, JSON.stringify(data));
    return this.getUser(userId);
  }
}
