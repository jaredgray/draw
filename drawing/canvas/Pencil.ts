
class Pencil implements ICanvasBrush
{
    constructor()
    {

    }

    private size: number;
    private color: string;
    public setSize(size: number): void
    {
        this.size = size;
    }
    public setColor(color: string): void
    {
        this.color = color;
    }

    private context: CanvasRenderingContext2D;
    public setContext(context: CanvasRenderingContext2D)
    {        
        this.context = context;
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.size;
    }
    
    private lastPoint: Point;
    public startDraw(point: Point): void
    {
        this.lastPoint = point;
        this.context.beginPath();
        this.context.moveTo(point.x, point.y);
    }
    // we could keep a history of points if it was necessary to create an effect
    public drawPoint(point: Point): void
    {
        let p1 = this.lastPoint;
        let p2 = point;
        //let p1 = <Action<Point>>((index == 0 && historicalPoints) || (points.length < 2 && historicalPoints) ? historicalPoints[historicalPoints.length - 1] : point[index - 1]);
        //let p2 = point;
        if (p1 && p2)
            this.context.quadraticCurveTo(p1.x, p1.y, p1.x + (p2.x - p1.x) / 2, p1.y + (p2.y - p1.y) / 2);
        
        this.context.stroke();
        this.lastPoint = point;
    }
    public endDraw(point: Point): void
    {
        this.drawPoint(point);
    }

    public getTypeName(): string
    {
        return "Pencil";
    }
}