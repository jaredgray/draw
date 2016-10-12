import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { FormsModule }   from '@angular/forms';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';
import { MdSidenavModule } from '@angular2-material/sidenav';


//import { AppRoutingModule } from './app.routing'; //TODO: Create app.routing
import { AppComponent } from './app.component';
import { TicTacToeGameComponent } from "./tictactoe-game/tictactoe-game.component"

import { UserService } from "./userservice/user.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        MdToolbarModule,
        MdCardModule,
        MdIconModule,
        MdInputModule,
        MdButtonModule,
        MdSidenavModule
        //AppRoutingModule,
    ],
    declarations: [AppComponent, TicTacToeGameComponent],
    providers: [MdIconRegistry, UserService],
    bootstrap: [AppComponent],
})
export class AppModule { }
