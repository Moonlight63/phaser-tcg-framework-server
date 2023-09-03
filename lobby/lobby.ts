export class Lobby {
  id: string;
  users: string[]; // Array of user IDs

  constructor(id: string) {
    this.id = id;
    this.users = [];
  }

  addUser(userId: string) {
    this.users.push(userId);
  }

  removeUser(userId: string) {
    this.users = this.users.filter(id => id !== userId);
  }
}
