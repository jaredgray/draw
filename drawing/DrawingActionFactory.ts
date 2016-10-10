import { Action } from "../user/Action";
import { Point } from "./Point";
import { DrawingAction } from "./DrawingAction";
export class DrawingActionFactory implements IActionFactory
{
    createAction(): Action<Point>
    {
        return new DrawingAction();
    }
}