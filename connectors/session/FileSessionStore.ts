import { SessionStorageConnector } from './SessionStorageConnector';
import session from 'express-session';
import FileStoreFactory from 'session-file-store';
import type { SessionStorageOptions } from '../../configParser';

export class FileSessionStorage extends SessionStorageConnector {
  private readonly store: session.Store;

  constructor(config: SessionStorageOptions['FileStore']) {
    super();
    const defaultOptions = {}; // Default options can be set here
    const options = { ...defaultOptions, ...config };
    const FileStore = FileStoreFactory(session);
    this.store = new FileStore(options);
  }

  getStore(): session.Store {
    return this.store;
  }
}
