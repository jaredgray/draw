import { Component } from '@angular/core';
import { DomService } from "../../app/services/domservice/dom.service";
import { UserService } from "./userservice/user.service";

import { User } from "./models/index";
@Component({
    moduleId: module.id,
    selector: 'tictactoe-app',
    templateUrl: "app.component.html",
    providers: [DomService]
})
export class AppComponent
{
    constructor(private userService: UserService) { this.isUserSet = false; }
    
    public user: User = new User();
    isUserSet: boolean;
    setUser()
    {
        console.log("setting user to " + this.user.name);
        
        if (this.user.name && this.user.name.length)
        {
            this.isUserSet = true;
            this.userService.setUser(this.user);
        }    
    }
}
