///<reference path="./Enumerable.ts" />
export class InputListener implements IInputState
{
    constructor(scope: HTMLElement)
    {
        this.InputDownListeners = new Array<IInputEventCallback>();
        this.InputUpListeners = new Array<IInputEventCallback>();
        this.InputMoveListeners = new Array<IInputEventCallback>();
        scope.addEventListener("mousedown", this.OnInputDown.bind(this));
        scope.addEventListener("mouseup", this.OnInputUp.bind(this));
        scope.addEventListener("mousemove", this.OnInputMove.bind(this));
        scope.addEventListener("touchstart", this.OnInputDown.bind(this));
        scope.addEventListener("touchend", this.OnInputUp.bind(this));
        scope.addEventListener("touchmove", this.OnInputMove.bind(this));
        this.scope = scope;
    }
    private scope: HTMLElement;
    public IsInputDown: boolean;
    public X: number;
    public Y: number;
    private OnInputDown(event: UIEvent): void
    {
        this.IsInputDown = true;
        this.setLocation(event);
        for (var index = 0; index < this.InputDownListeners.length; index++)
        {
            var handler = this.InputDownListeners[index];
            handler({ event: event, state: this });
        }
    }

    private OnInputUp(event: UIEvent): void
    {
        this.IsInputDown = false;
        this.setLocation(event);
        for (var index = 0; index < this.InputUpListeners.length; index++)
        {
            var handler = this.InputUpListeners[index];
            handler({ event: event, state: this });
        }
    }

    private OnInputMove(event: UIEvent): void
    {
        this.setLocation(event);
        for (var index = 0; index < this.InputMoveListeners.length; index++)
        {
            var handler = this.InputMoveListeners[index];
            handler({ event: event, state: this });
        }
    }

    private setLocation(event: UIEvent): void
    {

        var offset = this.getOffset(this.scope);
        if ((<TouchEvent>event).touches)
        {  
            if(!(<TouchEvent>event).touches[0])
            {
                return;
            }
            this.X = Math.floor((<TouchEvent>event).touches[0].pageX - offset.X);
            this.Y = Math.floor((<TouchEvent>event).touches[0].pageY - offset.Y);
        }
        else
        {
            this.X = Math.floor((<MouseEvent>event).pageX - offset.X);
            this.Y = Math.floor((<MouseEvent>event).pageY - offset.Y);
        }
    }

    private setLocationTouch(event: TouchEvent): void
    {

        var offset = this.getOffset(this.scope);
        this.X = Math.floor(event.touches[0].pageX - offset.X);
        this.Y = Math.floor(event.touches[0].pageY - offset.Y);
    }

    // private getOffset(el: HTMLElement)
    // {
    //     var _x = 0;
    //     var _y = 0;
    //     while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop))
    //     {
    //         _x += el.offsetLeft - el.scrollLeft;
    //         _y += el.offsetTop - el.scrollTop;
    //         el = el.offsetParent;
    //     }
    //     return { Y: _y, X: _x };
    // }

    private getOffset(el: HTMLElement)
    {
        let rect = el.getBoundingClientRect();
        return {
            X: rect.left + window.scrollX,
            Y: rect.top + window.scrollY
        }
    }

    private InputDownListeners: Array<IInputEventCallback>;
    private InputUpListeners: Array<IInputEventCallback>;
    private InputMoveListeners: Array<IInputEventCallback>;

    public AddInputDownListener(listener: IInputEventCallback)
    {
        if (this.InputDownListeners.indexOf(listener) < 0)
            this.InputDownListeners.push(listener);
    }
    public AddInputUpListener(listener: IInputEventCallback)
    {
        if (this.InputUpListeners.indexOf(listener) < 0)
            this.InputUpListeners.push(listener);
    }
    public AddInputMoveListener(listener: IInputEventCallback)
    {
        if (this.InputMoveListeners.indexOf(listener) < 0)
            this.InputMoveListeners.push(listener);
    }
    public RemoveInputDownListener(listener: IInputEventCallback)
    {
        if (this.InputDownListeners.indexOf(listener) >= 0)
            this.InputDownListeners.slice(this.InputDownListeners.indexOf(listener), 1);
    }
    public RemoveInputUpListener(listener: IInputEventCallback)
    {
        if (this.InputUpListeners.indexOf(listener) >= 0)
            this.InputUpListeners.slice(this.InputUpListeners.indexOf(listener), 1);
    }
    public RemoveInputMoveListener(listener: IInputEventCallback)
    {
        if (this.InputMoveListeners.indexOf(listener) >= 0)
            this.InputMoveListeners.slice(this.InputMoveListeners.indexOf(listener), 1);
    }
}
