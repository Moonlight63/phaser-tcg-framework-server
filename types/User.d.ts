import type { UserPublic as AppUser } from '../connectors/user/User';

declare global {
  namespace Express {
    interface User extends AppUser { }
  }
}