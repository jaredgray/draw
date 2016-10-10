import { Point } from "./Point";
interface IDrawingBrush 
{
    startDraw(point: Point): void;
    drawPoint(point: Point): void;
    endDraw(point: Point): void;

    getTypeName(): string;
}