import { UserPublic } from "../../../connectors/user/User";
import { SocketEvent } from "../../Events";



export type JoinedPayload = SocketEvent & {
  event: 'Joined';
  user: string;
  name: string;
};

export const joined = (user: UserPublic): JoinedPayload => ({
  event: "Joined",
  user: user.id,
  name: user.username,
});
