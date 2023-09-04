import { CardId } from "../../game/Cards/CardFactory";

import { z } from "zod";

// export type User = {
//     id: string;
//     username: string;
//     password: string;
//     decks: Array<Deck>;
// };

// export type UserPublic = Omit<User, "password">;

// export type Deck = {
//     id: string;
//     title: string;
//     cards: Array<CardId>;
// };


export const DeckSchema = z.object({
    name: z.string(),
    cards: z.array(z.string()),
});

export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
    password: z.string(),
    decks: z.array(DeckSchema),
});

export type User = z.infer<typeof UserSchema>;

export const UserPublicSchema = UserSchema.omit({ password: true });

export type UserPublic = z.infer<typeof UserPublicSchema>;

// export type Card = {
//     id: string;
//     name: string;
//     description: string;
//     pointValue: number;
//     imageUrl: string;
// }

