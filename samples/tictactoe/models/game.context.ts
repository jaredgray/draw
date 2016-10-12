export class GameContext
{
    // initiated only by the webapi
    public created: string;
    public completed: string;

    // these are all user names 
    public me: string;
    public opponent: string;
    public initiator: string;
    public turn: string;

    public complete: boolean;
    public winner: string;

    isWaitingOnOpponent(): boolean
    {
        return null != this.opponent && null != this.turn && this.turn == this.opponent;
    }
}
