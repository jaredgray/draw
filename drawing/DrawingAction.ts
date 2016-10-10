
///<reference path="../user/Action.ts" />
///<reference path="./Point.ts" />
import { Action } from "../user/Action";
import { Point } from "./Point";
export class DrawingAction extends Action<Point>
{
    layer: number;
}