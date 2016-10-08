///<reference path="../InputListener.ts" />
class InputProviderContext
{
    constructor()
    {
        this._tension = 0.4;
        this._smoothnessThreshold = 6;
        this._minDistanceForNewPoint = 4;
    }

    /**
     * defines the size of the buffer used to smooth out the users drawing actions
     */
    public get smoothnessThreshold(): number { return this._smoothnessThreshold; }
    public set smoothnessThreshold(value: number) { this._smoothnessThreshold = value; }
    private _smoothnessThreshold: number;

    public get tension(): number { return this._tension; }
    public set tension(value: number) { this._tension = value; }
    private _tension: number;

    public get minDistanceForNewPoint(): number { return this._minDistanceForNewPoint; } 
    public set minDistanceForNewPoint(value: number) { this._minDistanceForNewPoint = value; }
    private _minDistanceForNewPoint: number;
    /**
     * a reference to a InputListener attached to the canvas. this is used to hook into the user's mouse/touch events
     */
    public get input(): InputListener { return this._input; }
    public set input(value: InputListener) { this._input = value; }
    private _input: InputListener;
}