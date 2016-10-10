import { Injectable } from '@angular/core';
import { GameContext, User, Turn } from "../models/index";
@Injectable()
export class GameService
{
    constructor() { }
    
    newGame(userName: string, gameId: string)
    : GameContext
    {
        let context = new GameContext();
        context.me = new User();
        context.me.name = userName;
        return context;
    }
}