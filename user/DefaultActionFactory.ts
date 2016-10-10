import { Action } from "./Action";
import { Point } from "../drawing/Point";
import { IActionFactory } from "./IActionFactory";
export class DefaultActionFactory implements IActionFactory
{
    createAction(): Action<Point>
    {
        return new Action<Point>();
    }
}