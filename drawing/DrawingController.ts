///<reference path="IInputController.ts" />
import { DrawingLayerManager } from "./DrawingLayerManager";
import { DrawingContext } from "./DrawingContext";
import { DrawingLayer } from "./DrawingLayer";
import { Action } from "../user/Action";
import { Point } from "./Point";

export class DrawingController implements IInputController
{
    constructor()
    {
        this.layerManager = new DrawingLayerManager();
        this.Context = new DrawingContext();

        this.layerManager.LayerCollectionChanged.add(this.onLayerChanged);
    }

    private layerManager: DrawingLayerManager;

    public Context: DrawingContext;

    public onLayerChanged(layer: DrawingLayer, added: boolean): void
    {

    }


    public handleInput(points: Array<Action<Point>>): void
    {
        // here we are dealing with raw input
        // our goal is to contextal information to these points such as the tool that is being used and distribute this context to 
        // any instance that is interested in say keeping a history of or responding to this information
        for (var index = 0; index < points.length; index++)
        {
            var element = points[index];
            // this.drawingPoints.push(element);

            // if (this.isRendering)
            // {
            //     this.renderer.render(element);
            // }
        }
    }

    
}