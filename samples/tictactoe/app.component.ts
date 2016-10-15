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
            console.log(oauthToken);
            this.gameView.user.name = oauthToken.state;
            // sweet, received a token
            // TODO: check validity of the token
            this.googleApi.getSignedInUserEmail(oauthToken).subscribe(email =>
            {
                this.gameView.user.email = email.data.email;
                this.userService.setUser(this.gameView.user).subscribe(user =>
                {
                    console.log(user);
                },
                error =>
                {
                    console.log(error);
                });
            },
            error =>
            {
                console.log("Wa waaa");
            });
        }    
    }

    setUser()
    {
        console.log("setting the user to " + this.gameView.user.name);

        if (this.gameView.user.name && this.gameView.user.name.length)
        {
            // this will cause a redirect to google
            // when the player is redirected back, the ngOnInit 
            // will take care of completing login for the game.
            this.oauthService.loginGoogle(this.gameView.user.name);
        }
    }
}
