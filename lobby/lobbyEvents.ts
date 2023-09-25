import { Server, Socket } from 'socket.io';
import { LobbyStorage, IO, UserStorage } from '../ServerState';
import { joined } from '../events/LobbyEvents/Emitters/UserJoin';
import { left } from '../events/LobbyEvents/Emitters/UserLeft';

const lobbyStorage = LobbyStorage();

export const setupLobbyEvents = () => {
  IO().on('connection', (socket) => {

    socket.on("JoinUser", async ({ userId, lobbyId }) => {
      const user = await UserStorage().getUser(userId);
      if (user) {
        const lobby = await lobbyStorage.getLobby(lobbyId);
        if (lobby) {
          if (lobby.users.includes(userId)) {
            socket.join(userId);
            socket.join(lobbyId);
            lobby.emitter.emit(joined(user));
            return true;
          }
        }
      }
      socket.disconnect(true);
      return false;
    });

    socket.on("LeaveUser", async ({ userId, lobbyId }) => {
      const user = await UserStorage().getUser(userId);
      if (user) {
        const lobby = await lobbyStorage.getLobby(lobbyId);
        if (lobby) {
          if (lobby.users.includes(userId)) {
            socket.leave(userId)
            socket.leave(lobbyId)
            lobby.emitter.emit(left(user))
            return true;
          }
        }
      }
      return false
    })

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