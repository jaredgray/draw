import { Component } from '@angular/core';
import { DomService } from "../../app/services/domservice/dom.service";
import { UserService, GameService, OAuth2Service, GoogleApiService } from "./services/index";

import { GameView } from "./models/game.view";
@Component({
    moduleId: module.id,
    selector: 'tictactoe-app',
    templateUrl: "app.component.html",
    providers: [DomService, GameService, OAuth2Service, GoogleApiService]
})
export class AppComponent
{
    constructor(private userService: UserService, private gameService: GameService, private oauthService: OAuth2Service, private googleApi: GoogleApiService)
    {
        this.isUserSet = false; this.gameView = gameService.newGameView();
    }

    isUserSet: boolean;
    gameView: GameView;

    ngOnInit()
    {
        console.log("AppComponent.ngOnInit()");
        if (location.hash && location.hash.length)
        {
            var query = location.hash.substring(1);
            var oauthToken = this.oauthService.parseGoogleResponseQueryString(query);
            // sweet, received a token
            // TODO: check validity of the token
            this.googleApi.getSignedInUserEmail(oauthToken).subscribe(email =>
            {
                console.log(email);
            },
            error =>
            {
                console.log("Wa waaa");
            });
        }    
    }

    setUser()
    {
        console.log("setting the user to " + this.gameView.currentGame.me);

        if (this.gameView.currentGame.me && this.gameView.currentGame.me.length)
        {
            this.oauthService.loginGoogle(this.gameView.currentGame.me);
            //this.userService.setUser(this.user);
        }
    }
}
