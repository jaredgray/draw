///<reference path="./IInputActionCallback.ts" />
///<reference path="./Point.ts" />
///<reference path="../Historical.ts" />
///<reference path="../user/Action.ts" />
import { Action } from "../user/Action";
import { Historical } from "../Historical";
import { InputProvider } from "./InputProvider";
import { Point } from "./Point";

export class DrawingRecorder
{
    public constructor(provider: InputProvider)
    {
        this.drawingPoints = new Array<Action<Point>>();
        provider.addInputActionListener(this.OnDraw.bind(this));
    }

    private drawingPoints: Array<Action<Point>>;
    private isRecording: boolean;
    private isPlaying: boolean;
    private renderer: IDrawingRenderer;
    private isRendering: boolean;

    public setRenderer(renderer: IDrawingRenderer)
    {
        this.renderer = renderer;
    }

    public record(): void
    {
        this.isRecording = true;
    }
    public stopRecording(): void
    {
        this.isRecording = false;
    }

    public playback(index: number = 0)
    {
        this.isPlaying = true;
        var node = this.drawingPoints[index];
        var nextNode = this.drawingPoints[index + 1];
        if (node && this.renderer)
        {
            this.renderer.render(node);
        }
        if (node && nextNode)
        {
            setTimeout(this.playback.bind(this), nextNode.date - node.date, ++index);
        }
        else
        {
            this.isPlaying = false;
            this.onPlaybackComplete();
        }
    }

    public clear()
    {
        this.isRendering = false;
        this.drawingPoints = new Array<Action<Point>>();
    }

    public startContinuousRendering()
    {
        this.record();
        this.isRendering = true;
    }

    /**
     * renders the drawing 
     */
    public renderDrawing()
    {
        if (!this.renderer)
            return;

        for (var index = 0; index < this.drawingPoints.length; index++)
        {
            var element = this.drawingPoints[index];
            // before the renderer can draw we need to store the rest of the 
            this.renderer.render(element);
        }
    }

    public OnDraw(points: Array<Action<Point>>): void
    {
        if (!this.isRecording)
        {
            return;
        }
        for (var index = 0; index < points.length; index++)
        {
            var element = points[index];
            this.drawingPoints.push(element);

            if (this.isRendering)
            {
                this.renderer.render(element);
            }
        }
    }


    protected onPlaybackComplete()
    {

    }

    private _layers;
}