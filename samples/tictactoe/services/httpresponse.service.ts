import { Injectable } from '@angular/core';
@Injectable()
export class HttpResponseService
{
    constructor()
    {
        
    }
    handleResponse()
    {
        if (location.hash && location.hash.length)
        {
            var query = location.hash.substring(1);
            // parse the query using the OAuth2Service
            // if any 
        }
    }
}