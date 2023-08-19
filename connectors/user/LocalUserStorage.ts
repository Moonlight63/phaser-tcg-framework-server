import fs from 'fs';
import { UserStorageConnector } from './UserStorageConnector';

export class LocalUserStorage extends UserStorageConnector {
  private filePath: string;

  constructor(config: any) {
    super();
    this.filePath = config.filePath;
  }

  async getUser(userId: string): Promise<any> {
    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    return data[userId] || null;
  }

  async setUser(user: any): Promise<void> {
    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    data[user.id] = user;
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }

  async deleteUser(userId: string): Promise<void> {
    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    delete data[userId];
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }
}