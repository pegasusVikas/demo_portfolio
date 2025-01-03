export interface GameOptions {
    "A": string;
    "B": string;
    "C": string;
}

export interface GameState {
    "image" : any;
    "story summary": string;
    "current state": string;
    options: GameOptions;
    "health" : number;
}

export interface GameAction {
    "story summary": string;
    "current state": string;
    "chosen option": string;
}
