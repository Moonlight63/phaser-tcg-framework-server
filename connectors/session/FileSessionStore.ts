import { SessionStorageConnector } from './SessionStorageConnector';
import session from 'express-session';
import FileStoreFactory from 'session-file-store';
import type { SessionStorageOptions } from '../../configParser';
const FileStore = FileStoreFactory(session);

export class FileSessionStorage extends SessionStorageConnector {
  private readonly options: any;

  constructor(config: SessionStorageOptions['FileStore']) {
    super();
    this.options = config || {}; // Default options can be set here
  }

  getStore(): session.Store {
    return new FileStore(this.options);
  }
}
