class DefaultActionFactory implements IActionFactory
{
    createAction(): Action<Point>
    {
        return new Action<Point>();
    }
}