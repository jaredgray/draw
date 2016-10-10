import { Drawing } from "./Drawing";
import { InputListener } from "../InputListener"
import { DrawingRecorder } from "../drawing/DrawingRecorder";
import { CanvasDrawingRenderer } from "../drawing/canvas/CanvasDrawingRenderer";
import { Pencil } from "../drawing/canvas/Pencil";
import { InputProviderContext } from "../drawing/InputProviderContext";
import { InputProvider } from "../drawing/InputProvider";
import { DrawingActionFactory } from "../drawing/DrawingActionFactory";
import { DrawingController } from "../drawing/DrawingController";
export class ExtendedDrawing extends Drawing
{
    createdCallback(): void
    {        
        super.initializeDefaults();

        super.createCanvas();


        
        this.Mouse = new InputListener(this);
        this.inputProviderContext = new InputProviderContext();
        this.inputProviderContext.tension = 0.4;
        this.inputProviderContext.minDistanceForNewPoint = .01;
        this.inputProviderContext.input = this.Mouse;
        this.inputProvider = new InputProvider();
        this.inputProvider.setContext(this.inputProviderContext);
        var actionFactory = new DrawingActionFactory();
        this.inputProvider.setActionFactory(actionFactory);

        var controller = new DrawingController();
        // attach the controller to the input provider
        this.inputProvider.addInputActionListener(controller.handleInput);



        window["ExtendedDom"] = window["ExtendedDom"] || {};
        window["ExtendedDom"][this.getAttribute("id")] = this;

        
        this.inputProvider.AllowInput = this.AllowInput;
            
        this.recorder = new DrawingRecorder(this.inputProvider);
        this.renderer = new CanvasDrawingRenderer(this.canvas);
        var brush = new Pencil();
        brush.setSize(this.LineWidth);
        brush.setColor(this.DrawingColor);        
        this.renderer.setBrush(brush);
        this.recorder.setRenderer(this.renderer);
        this.recorder.startContinuousRendering();
        this.testinstantiation();
    }
}