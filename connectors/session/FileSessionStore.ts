import { SessionStorageConnector } from './SessionStorageConnector';
import session from 'express-session';
import FileStoreFactory from 'session-file-store';
import type { SessionStorageOptions } from '../../configParser';

export class FileSessionStorage extends SessionStorageConnector {
  private readonly store: session.Store;

  constructor(config: SessionStorageOptions['FileStore']) {
    super();
    const defaultOptions: SessionStorageOptions['FileStore'] = {
      type: "FileStore",
      path: './db/sessions',
      ttl: 3600, // Session time to live in seconds. Defaults to `3600`
      retries: 5, // The number of retries to get session data from a session file. Defaults to `5`
      factor: 1, // The exponential factor to use for retry. Defaults to `1`
      minTimeout: 50, // The number of milliseconds before starting the first retry. Defaults to `50`
      maxTimeout: 100, // The maximum number of milliseconds between two retries. Defaults to `100`
    };
    console.log("Creating Store: ");

    const options = { ...defaultOptions, ...config };
    const FileStore = FileStoreFactory(session);
    this.store = new FileStore(options);
    // console.log(this.store);

  }

  getStore() {
    console.log("Getting Store:");

    return this.store;
  }
}
