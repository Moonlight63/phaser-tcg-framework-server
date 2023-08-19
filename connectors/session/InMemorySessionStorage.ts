import { SessionStorageConnector } from './SessionStorageConnector';

export class InMemorySessionStorage extends SessionStorageConnector {
  private storage: Map<string, any> = new Map();

  async getSession(sessionId: string): Promise<any> {
    return this.storage.get(sessionId) || null;
  }

  async setSession(session: any): Promise<void> {
    this.storage.set(session.id, session);
  }

  async deleteSession(sessionId: string): Promise<void> {
    this.storage.delete(sessionId);
  }
}