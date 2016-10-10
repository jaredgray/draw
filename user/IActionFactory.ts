import { Action } from "./Action";
import { Point } from "../drawing/Point";
export interface IActionFactory
{
    createAction(): Action<Point>;
}