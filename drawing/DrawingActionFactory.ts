class DrawingActionFactory implements IActionFactory
{
    createAction(): Action<Point>
    {
        return new DrawingAction();
    }
}