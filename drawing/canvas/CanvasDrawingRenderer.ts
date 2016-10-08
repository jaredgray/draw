
class CanvasDrawingRenderer implements IDrawingRenderer
{
    constructor(canvas: HTMLCanvasElement)
    {
        this.canvas = canvas;
    }
    private canvas: HTMLCanvasElement;
    private brush: IDrawingBrush;

    public setBrush(brush: IDrawingBrush): void
    {
        this.brush = brush;
        (<ICanvasBrush>brush).setContext(this.canvas.getContext("2d"));
    }

    public render(point: Action<Point>): void
    {
        if (!this.brush)
            return;
        if (point.type == "start")
        {
            this.brush.startDraw(point.target);
        }
        else if (point.type == "continue")
        {
            this.brush.drawPoint(point.target);
        }
        else if (point.type == "end")
        {
            this.brush.endDraw(point.target);
        }
    }

    public clear(): void
    {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
    }
}