import { Server } from "socket.io";
import { IO } from "../ServerState";
import { LobbyEmitters, LobbyListeners } from "./LobbyEvents/LobbyEvents";




export interface SocketEvent {
  event: string;
  [key: string]: any;
}

export class SocketEmitter {
  constructor(private lobbyId: string) { }

  emit(payload: SocketEvent, callback?: Function) {
    const { event, ...args } = payload;
    if (callback) {
      IO().to(this.lobbyId).emit(event as keyof ServerToClientEvents, args, callback);
    } else {
      IO().to(this.lobbyId).emit(event as keyof ServerToClientEvents, args);
    }
  }
}

type ExtractEventPayload<E, T> = E extends { event: T } ? Omit<E, 'event'> : never;
type SocketEmitters = LobbyEmitters;

export type ServerToClientEvents = {
  [K in SocketEmitters['event']]: (payload: ExtractEventPayload<SocketEmitters, K>, callback?: Function) => void;
};

export type ClientToServerEvents = LobbyListeners;


