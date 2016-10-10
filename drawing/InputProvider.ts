///<reference path="../InputListener.ts" />
///<reference path="../IDestroyable.ts" />
///<reference path="../Historical.ts" />
///<reference path="../user/Action.ts" />
///<reference path="./InputProviderContext.ts" />
///<reference path="./IInputActionCallback.ts" />
///<reference path="./Point.ts" />
///<reference path="./PointList.ts" />
///<reference path="../IInputStateEvent.ts" />
/**
 * InputProvider is an abstraction of user inputs. It provides collections of primitive Actions to 
 * objects that attach themselvs to this mechinism via the AddInputActionListener method. The listener
 * is then provided with sets of interpolated points from a point based input listener.
 */
import { DefaultActionFactory } from "../user/DefaultActionFactory";
import { InputProviderContext } from "./InputProviderContext";
import { Action } from "../user/Action";
import { Point } from "./Point";
export class InputProvider implements IDestroyable
{

    // constructor/initializing/deinitializing
    constructor()
    {
        this.InputActionListeners = new Array<IInputActionCallback>();
        this.actionFactory = new DefaultActionFactory();
    }
    // Variables
    private context: InputProviderContext;
    private isInputDown: boolean;
    private lastPoint: Action<Point>;
    private lastNormalizedPoint: Action<Point>;
    private currentPointList: Array<Action<Point>>;
    private actionFactory: IActionFactory;


    /**
     * Initializes the current point listen
     * @returns void
     */
    private initializePointList(): void
    {
        this.currentPointList = new Array<Action<Point>>();
    }

    private OnInputDown(event: IInputStateEvent): void
    {
        this.addPoint(this.getCurrentAction(event, "start"));
        this.isInputDown = true;
    }
    private OnInputMove(event: IInputStateEvent): void
    {
        event.event.preventDefault();
        event.event.stopImmediatePropagation();
        this.isInputDown = event.state.IsInputDown;
        if (event.state.IsInputDown)
        {
            //this.currentPoint = this.getCurrentAction(event, "continue");
            this.addPoint(this.getCurrentAction(event, "continue"));
            if (this.currentPointList.length >= this.context.smoothnessThreshold)
            {
                this.dispatchCurrentPointList();
            }
        }
    }
    private OnInputUp(event: IInputStateEvent): void
    {
        this.isInputDown = false;
        this.addPoint(this.getCurrentAction(event, "end"));
        this.dispatchCurrentPointList();
        this.lastPoint = null;
        this.lastNormalizedPoint = null;
    }

    private getCurrentAction(event: IInputStateEvent, type: string): Action<Point>
    {
        let point = new Point();
        point.x = event.state.X;
        point.y = event.state.Y;
        var action = this.actionFactory.createAction();
        action.type = type;
        action.target = point;
        action.date = Date.now();
        return action;
    }

    private dispatchCurrentPointList(): void
    {
        // convert points to smoothing transition
        var normalizedPoints = this.normalizePoints(this.currentPointList.splice(0));
        this.currentPointList = new Array<Action<Point>>();
        if (this.InputActionListeners.length <= 0 || !this.AllowInput)
            return;
        for (var index = 0; index < this.InputActionListeners.length; index++)
        {
            var callback = this.InputActionListeners[index];
            callback(normalizedPoints /*, historicalPointList */);
        }
        this.lastNormalizedPoint = normalizedPoints[normalizedPoints.length - 1];
    }

    private addPoint(point: Action<Point>)
    {
        if (point)
        {
            let xDistance = 0, yDistance = 0, minDistance = this.context.minDistanceForNewPoint;
            if (this.lastPoint)
            {
                xDistance = (point.target.x > this.lastPoint.target.x) ? point.target.x - this.lastPoint.target.x : this.lastPoint.target.x - point.target.x;
                yDistance = (point.target.y > this.lastPoint.target.y) ? point.target.y - this.lastPoint.target.y : this.lastPoint.target.y - point.target.y;
            }
            if (!this.lastPoint || (xDistance >= minDistance || yDistance >= minDistance))
            {
                if (this.lastPoint)
                {
                    this.interpolate(point, this.lastPoint, this.context.tension);
                }
                this.currentPointList.push(point);
                this.lastPoint = point;
            }
        }
    }

    private interpolate(newPoint: Action<Point>, lastPoint: Action<Point>, amp: number)
    {
        if (!newPoint || !lastPoint)
            return;
        //console.log("interpolating...");
        lastPoint.target.x += (newPoint.target.x - lastPoint.target.x) * amp;
        lastPoint.target.y += (newPoint.target.y - lastPoint.target.y) * amp;
    }

    private normalizePoints(points: Array<Action<Point>>): Array<Action<Point>>
    {
        for (var index = 0; index < points.length; index++)
        {
            var element = points[index];

            if (index == 0)
            {
                if (null != this.lastNormalizedPoint)
                {
                    this.interpolate(this.lastNormalizedPoint, element, this.context.tension);
                }
            }
            else
            {
                this.interpolate(points[index - 1], element, this.context.tension);
            }
        }
        return points;
    }
    private InputActionListeners: Array<IInputActionCallback>;
    /**
     * detaches this instance from the current context. if the current context is null or the context's input is null, a graceful quite return is performed
     * @returns void
     */
    private detach(): void
    {
        if (null == this.context || null == this.context.input)
            return;
        this.context.input.RemoveInputMoveListener(this.OnInputMove.bind(this));
        this.context.input.RemoveInputDownListener(this.OnInputDown.bind(this));
        this.context.input.RemoveInputUpListener(this.OnInputUp.bind(this));
        this.context.input = null;
    }


    // below is the public interface
    
    /**
     * instructs this instance to attach itself to a context
     * @param {InputProviderContext} context - contextual instance that allows this provider to listen to an input such as a mouse or touch from a user
     * @returns void
     */
    public setContext(context: InputProviderContext) : void
    {
        this.context = context;
        this.context.input.AddInputMoveListener(this.OnInputMove.bind(this));
        this.context.input.AddInputDownListener(this.OnInputDown.bind(this));
        this.context.input.AddInputUpListener(this.OnInputUp.bind(this));
        this.initializePointList();
    }
    public setActionFactory(factory: IActionFactory)
    {
        this.actionFactory = factory;
    }
    /**
     * instructs this instance to detach and dispose of it's context
     * @returns void
     */
    public destroy(): void
    {
        this.detach();
        this.context = null;
    }

    /**
     * @property {boolean} AllowInput - get/set. instructs this instance to allow or dis allow input from the listener. this is useful if the enclosure wants to 
     * stop propogation of user input whilst maintaining the integrity of the current state.
     */
    public get AllowInput() : boolean { return this.allowInput; }
    public set AllowInput(value: boolean) { this.allowInput = value; }
    private allowInput: boolean;

    public addInputActionListener(listener: IInputActionCallback)
    {
        if (this.InputActionListeners.indexOf(listener) < 0)
            this.InputActionListeners.push(listener);
    }
}






    // private normalizePoints(points: Array<Action<Point>>) {
    //     let t1x = 0, t2x = 0, t1y = 0, t2y = 0, st = 0, c1 = 0, c2 = 0, c3 = 0, c4 = 0, x = 0, y = 0;
    //     // 1. loop goes through point array
    //     // 2. loop goes through each segment between the 2 pts + 1e point before and after
    //     for (var i = 1; i < (points.length - 2); i++) {
    //         // calc tension vectors
    //         t1x = (points[i + 1].target.x - points[i - 1].target.x) * this.context.tension;
    //         t2x = (points[i + 2].target.x - points[i].target.x) * this.context.tension;

    //         t1y = (points[i + 1].target.y - points[i - 1].target.y) * this.context.tension;
    //         t2y = (points[i + 2].target.y - points[i].target.y) * this.context.tension;
    //         for (var t = 0; t <= this.context.smoothnessThreshold; t++) {


    //             // calc step
    //             st = t / numOfSegments;

    //             // calc cardinals
    //             c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
    //             c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
    //             c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
    //             c4 = Math.pow(st, 3) - Math.pow(st, 2);

    //             // calc x and y cords with common control vectors
    //             x = c1 * points[i] + c2 * points[i + 2] + c3 * t1x + c4 * t2x;
    //             y = c1 * points[i + 1] + c2 * points[i + 3] + c3 * t1y + c4 * t2y;

    //             //store points in array
    //             res.push(x);
    //             res.push(y);

    //         }
    //     }
    // }