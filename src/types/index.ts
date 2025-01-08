export interface GameOptions {
    "A": string;
    "B": string;
    "C": string;
}

export interface GameState {
    gameId?: string;
    stateId?: string;
    nextStateId?: string;
    isGameOver?: boolean;
    storyTitle?: string;
    "image" : any;
    "story summary": string;
    "current state": string;
    options: GameOptions;
}

export interface GameAction {
    gameId: string;
    stateId: string;
    nextStateId: string;
    "story summary": string;
    "current state": string;
    "chosen option": string;
}