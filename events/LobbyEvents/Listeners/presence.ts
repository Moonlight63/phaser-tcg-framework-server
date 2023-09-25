



export interface Presence {
  JoinUser: (payload: { userId: string, lobbyId: string }) => void;
  LeaveUser: (payload: { userId: string, lobbyId: string }) => void;
}
