
///<reference path="./Point.ts" />
///<reference path="../Historical.ts" />
///<reference path="../user/Action.ts" />
interface IInputActionCallback {
    /**
     * called when data is ready to be rendered 
     * 
     * @points a list of points needed to be drawn to the screen
     * @method instructs at what point during the draw process we are in. use the static values of the class DrawMethods to determine what state it is
     */
    (points: Array<Action<Point>>): void;
}