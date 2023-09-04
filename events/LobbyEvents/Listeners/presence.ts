



export interface Presence {
  JoinUser: (payload: { userId: string }) => void;
  LeaveUser: (payload: { userId: string }) => void;
}
