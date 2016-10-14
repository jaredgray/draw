import { GameContext } from "./game.context";
export class GameView
{
    constructor() { this.currentGame = new GameContext(); }
    public currentGame: GameContext;
    public lastGame: GameContext;
}