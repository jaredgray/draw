
import { Action } from "../user/Action";
import { Point } from "./Point";
interface IInputController
{
    handleInput(points: Array<Action<Point>>): void;
}