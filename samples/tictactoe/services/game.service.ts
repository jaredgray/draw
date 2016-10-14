import { Injectable } from '@angular/core';
import { GameContext, GameView } from "../models/index";
@Injectable()
export class GameService
{
    constructor() { }

    newGame(userName: string, gameId: string)
        : GameContext
    {
        let context = new GameContext();
        context.me = userName;
        context.initiator = userName;
        return context;
    }
    newGameView()
        : GameView
    {
        this.gameView = new GameView();
        return this.gameView;
    }

    private gameView: GameView;

    startGame(gameContext: GameContext)
    {
        // Post game to server
        gameContext.turn = gameContext.me;
    }
    completeGame(context: GameContext)
    {
        // Post game to server
        context.winner = context.me;
    }
    inviteUser(context: GameContext, phoneNumber: string)
    {

    }

    setGameContext(context: GameContext)
    {
        if (this.gameView.currentGame)
            this.gameView.lastGame = this.gameView.currentGame;
        this.gameView.currentGame = context;
        if (this.gameView.lastGame)
            this.gameView.currentGame.me = this.gameView.lastGame.me;
    }

    getGameView()
        : GameView
    {
        return this.gameView;
    }


}