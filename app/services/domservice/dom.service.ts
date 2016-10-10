import {Injectable} from '@angular/core';
import {ISelector} from "./Iselector";

@Injectable()
export class DomService {
    query(selector:any) : ISelector
    {
        return <ISelector>jQuery(selector);
    }
}