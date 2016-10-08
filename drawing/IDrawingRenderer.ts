interface IDrawingRenderer
{
    setBrush(brush: IDrawingBrush): void;
    render(point: Action<Point>): void;
}