import { GameContext } from "./game.context";
import { User } from './user.model';
export class GameView
{
    constructor() { this.currentGame = new GameContext(); this.user = new User(); }
    public currentGame: GameContext;
    public lastGame: GameContext;

    public user: User;
}