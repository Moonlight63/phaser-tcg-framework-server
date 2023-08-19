export type User = {
    id: string;
    username: string;
    password: string;
    decks: Array<Deck>;
};

export type Deck = {
    id: string;
    title: string;
    cards: Array<Card>;
};

export type Card = {
    id: string;
    name: string;
    description: string;
    pointValue: number;
    imageUrl: string;
}
