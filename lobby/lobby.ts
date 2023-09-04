import { UserStorage } from "../ServerState";
import { z } from "zod";

const GameRulesSchema = z.object({
  supplyDropCount: z.number().default(7),
  roundCount: z.number().default(3),
  lightSpeedWait: z.number().default(3),
  setupPhaseTimeout: z.number().default(60),
  setupGrace: z.number().default(15),
  timeoutType: z.enum(['Soft', 'Hard']).default('Soft'),
});

const LobbyConfigSchema = z.object({
  name: z.string(),
  isPublic: z.boolean().default(true),
  password: z.string().optional(),
  version: z.string().default("1.0.0"),
  rules: GameRulesSchema,
});
type LobbyConfig = z.infer<typeof LobbyConfigSchema>;

export class Lobby {
  id: string;
  users: string[]; // Array of user IDs
  owner: string;
  lobbyConfig: LobbyConfig;

  private constructor(ownerId: string, lobbyConfig: LobbyConfig) {
    const code = Math.random().toString(36).toUpperCase();
    this.id = code;
    this.owner = ownerId;
    this.users = [ownerId];
    this.lobbyConfig = lobbyConfig;
  }

  static async createLobby(ownerId: string, lobbyConfig?: Partial<LobbyConfig>): Promise<Lobby | null> {
    let ownerName: string | null = null;
    if (lobbyConfig?.name) {
      ownerName = lobbyConfig.name;
    } else {
      ownerName = (await UserStorage().getUser(ownerId))?.username ?? null;
    }
    if (!ownerName) {
      return null;
    }
    const defaultConfig: Partial<LobbyConfig> = {
      name: ownerName
    };
    const validatedConfig: LobbyConfig = LobbyConfigSchema.parse({ ...defaultConfig, ...lobbyConfig });
    const lobby = new Lobby(ownerId, validatedConfig);
    return lobby;
  }

  addUser(userId: string) {
    if (!this.users.includes(userId)) {
      this.users.push(userId);
    }
  }

  removeUser(userId: string) {
    this.users = this.users.filter(id => id !== userId);
  }
}
