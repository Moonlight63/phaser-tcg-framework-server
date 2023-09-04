import fs from 'fs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserStorageConnector } from './UserStorageConnector';
import { User, UserPublic, UserPublicSchema, UserSchema } from './User';
import { z } from 'zod';

const RegistrationSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export class LocalUserStorage extends UserStorageConnector {
  private filePath: string;

  constructor(config: any) {
    super();
    this.filePath = config.filePath;

  }

  // async getUserByUsername(username: string): Promise<any> {
  //   const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
  //   for (const userId in data.users) {
  //     if (data.users[userId].username === username) {
  //       return data.users[userId];
  //     }
  //   }
  //   return null;
  // }

  async getUserByUsername(username: string): Promise<UserPublic | null> {
    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    for (const userId in data.users) {
      const user = UserSchema.safeParse(data.users[userId]);
      if (user.success && user.data.username === username) {
        const sanitizedUser = UserPublicSchema.parse(user.data);
        return sanitizedUser;
      }
    }
    return null;
  }

  async getUser(userId: string): Promise<UserPublic | null> {
    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    const user = UserSchema.safeParse(data.users[userId]);
    if (user.success) {
      const sanitizedUser = UserPublicSchema.parse(user.data);
      return sanitizedUser;
    }
    return null;
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

  // async register(userData: any): Promise<UserPublic> {
  //   const user = await this.getUserByUsername(userData.username);
  //   if (user) {
  //     throw new Error('User already exists');
  //   }

  //   const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
  //   const userId = Date.now().toString();
  //   const newUser = {
  //     id: userId,
  //     username: userData.username,
  //     password: userData.password,
  //   };
  //   data.users[userId] = newUser;
  //   fs.writeFileSync(this.filePath, JSON.stringify(data));
  //   return this.getUser(userId);
  // }



  async register(userData: any): Promise<UserPublic | null> {
    const validationResult = RegistrationSchema.safeParse(userData);
    if (!validationResult.success) {
      throw new Error('Invalid registration data');
    }

    const user = await this.getUserByUsername(userData.username);
    if (user) {
      throw new Error('User already exists');
    }

    const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    const userId = Date.now().toString();
    const newUser = UserSchema.parse({
      id: userId,
      username: userData.username,
      password: userData.password,
      decks: [],
    });
    data.users[userId] = newUser;
    fs.writeFileSync(this.filePath, JSON.stringify(data));
    return this.getUser(userId);
  }
}
