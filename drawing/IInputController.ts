
import { Action } from "../user/Action";
import { Point } from "./Point";
export interface IInputController
{
    handleInput(points: Array<Action<Point>>): void;
}