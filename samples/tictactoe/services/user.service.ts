import { Injectable, EventEmitter } from '@angular/core';

import { User } from "../models/index";
@Injectable()
export class UserService
{
    constructor() { this.userChange = new EventEmitter<User>(); }

    current: User;

    userChange: EventEmitter<User>;

    setUser(user: User)
    {
        this.current = user;
        this.userChange.emit(this.current);
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
