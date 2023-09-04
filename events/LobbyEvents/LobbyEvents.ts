import { JoinedPayload } from "./Emitters/UserJoin";
import { LeftPayload } from "./Emitters/UserLeft";
import { Presence } from "./Listeners/presence";




export type LobbyEmitters = JoinedPayload
  | LeftPayload;

export type LobbyListeners = Presence