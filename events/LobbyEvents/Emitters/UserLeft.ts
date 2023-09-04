import { UserPublic } from "../../../connectors/user/User";
import { SocketEvent } from "../../Events";



export type LeftPayload = SocketEvent & {
  event: 'Left';
  user: string;
  name: string;
};
export const left = (user: UserPublic): LeftPayload => ({
  event: "Left",
  user: user.id,
  name: user.username,
});