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

  authenticate() {
    return passport.authenticate('local', { failureFlash: true });
  }

  async register(userData: any): Promise<User> {
    const user = await this.getUser(userData.username);
    if (user) {
      throw new Error('User already exists');
    }
    await this.setUser(userData);
    return userData;
  }

  initialize(app: Express.Application): void {
    app.use(passport.initialize());
    app.use(passport.session());
  }
}
