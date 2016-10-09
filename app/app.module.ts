import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import {MdToolbarModule} from '@angular2-material/toolbar'
import {MdCardModule} from '@angular2-material/card'
import {MdIconModule, MdIconRegistry} from '@angular2-material/icon'


//import { AppRoutingModule } from './app.routing'; //TODO: Create app.routing
import { AppComponent } from './app.component';
import {StageComponent} from "./stage/stage.component"

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        MdToolbarModule,
        MdCardModule,
        MdIconModule
        //AppRoutingModule,
    ],
    declarations: [AppComponent, StageComponent],
    providers: [MdIconRegistry],
    bootstrap: [AppComponent],
})
export class AppModule { }
