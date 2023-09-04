import { Server, Socket } from 'socket.io';
import { LobbyStorage, IO, UserStorage } from '../ServerState';
import { joined } from '../events/LobbyEvents/Emitters/UserJoin';

const lobbyStorage = LobbyStorage();

export const setupLobbyEvents = () => {
  IO().on('connection', (socket) => {

    socket.on("JoinUser", async ({ userId }) => {
      const user = await UserStorage().getUser(userId);
      if (user) {
        const lobby = await lobbyStorage.getLobby(userId);
        if (lobby) {
          if (lobby.users.includes(userId)) {
            socket.join(userId);
            lobby.emitter.emit(joined(user));
            return true;
          }
        }
      }
      socket.disconnect(true);
      return false;
    });

    // Leave Lobby Event
    // socket.on('leaveLobby', async (data) => {
    //   const { userId, lobbyId } = data;
    //   const lobby = await lobbyStorage.getLobby(lobbyId);
    //   if (lobby) {
    //     lobby.removeUser(userId);
    //     await lobbyStorage.setLobby(lobby);

    //     // Leave the socket room for this lobby
    //     socket.leave(lobbyId);

    //     // Notify others in the lobby about the user leaving
    //     socket.to(lobbyId).emit('userLeft', userId);
    //   }
    // });

    // Additional lobby events can be added here...

  });
};