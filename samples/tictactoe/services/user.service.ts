import { Injectable, EventEmitter } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions } from "@angular/http"
import { Observable } from 'rxjs/Observable';

import { User } from "../models/index";
@Injectable()
export class UserService
{
    constructor(private http: Http) { this.userChange = new EventEmitter<User>(); }

    current: User;

    userChange: EventEmitter<User>;

    setUser(user: User)
        : Observable<User>
    {
        console.log("SET USER---------");
        console.log(user);
        this.current = user;
        let t = this;
        this.userChange.emit(this.current);
        let headers = new Headers();
        let payload = JSON.stringify(user);
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, method: "post" });
        return this.http.post("http://localhost:52028/api/user", payload, options)
            .map((response: Response) =>
            {
                t.current = response.json(); return t.current;
            });
    }

    getCurrentUser()
        : User
    {
        return this.current;
    }

    subscribeToUserChange(generatorOrNext?: any, error?: any, complete?: any)
    {
        this.userChange.subscribe(generatorOrNext, error, complete);
    }



}
