import { Injectable } from '@angular/core';
import { Http, Request, Response } from "@angular/http"
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GoogleApiService
{
    constructor(private http: Http) { }

    getSignedInUserEmail(oauthToken: any)
        : Observable<any>
    { 
        return this.http.get('https://www.googleapis.com/userinfo/email?alt=json&access_token=' + oauthToken.access_token)
            .map((response: Response) => response.json());
    }
}