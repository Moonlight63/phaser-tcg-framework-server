export abstract class SessionStorageConnector {
  abstract getSession(sessionId: string): Promise<any>;
  abstract setSession(data: any): Promise<void>;
  abstract deleteSession(sessionId: string): Promise<void>;
  // Add any other session-specific methods here
}