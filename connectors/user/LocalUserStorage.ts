import fs from 'fs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
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

  async authenticate(username: string, password: string): Promise<User | null> {
    const user = await this.getUser(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
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
    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
      const user = await this.getUser(id);
      done(null, user);
    });

    passport.use(new LocalStrategy(async (username, password, done) => {
      const user = await this.authenticate(username, password);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
    }));

    app.use(passport.initialize());
    app.use(passport.session());
  }
}
