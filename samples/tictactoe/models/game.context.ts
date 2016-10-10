import { User, Turn } from "./index";
export class GameContext
{
    public me: User;
    public opponent: User;
    public id: string;

    public turn: Turn;

    isWaitingOnOpponent(): boolean
    {
        return null != this.opponent && null != this.turn && null != this.turn.user && this.turn.user == this.opponent;
    }
}
