import { Action } from "./Action";
import { Point } from "../drawing/Point";
export class DefaultActionFactory implements IActionFactory
{
    createAction(): Action<Point>
    {
        return new Action<Point>();
    }
}