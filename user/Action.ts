///<reference path="../Historical.ts" />
import { Historical } from "../Historical";
export class Action<T> extends Historical<T>
{
    type: string;
}