import session from 'express-session'

export abstract class SessionStorageConnector {
  abstract getStore(): session.Store;
  // Add any other session-specific methods here
}