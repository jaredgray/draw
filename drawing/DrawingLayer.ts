class DrawingLayer
{
    constructor()
    {
        this.visible = true;
        this.data = new PointList();
    }
    public visible: boolean;
    public data: PointList;
    public zIndex: number;
    
}