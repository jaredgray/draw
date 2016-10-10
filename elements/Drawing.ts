
import { InputListener } from "../InputListener"
import { DrawingRecorder } from "../drawing/DrawingRecorder";
import { CanvasDrawingRenderer } from "../drawing/canvas/CanvasDrawingRenderer";
import { Pencil } from "../drawing/canvas/Pencil";
import { InputProviderContext } from "../drawing/InputProviderContext";
import { InputProvider } from "../drawing/InputProvider";
export class Drawing extends HTMLElement
{
    canvas: HTMLCanvasElement;
    public AllowInput:boolean;

    createdCallback(): void
    {
        this.initializeDefaults();

        this.createCanvas();

        this.Mouse = new InputListener(this);
        this.inputProviderContext = new InputProviderContext();
        this.inputProviderContext.tension = 0.4;
        this.inputProviderContext.minDistanceForNewPoint = .01;
        this.inputProviderContext.input = this.Mouse;
        this.inputProvider = new InputProvider();
        this.inputProvider.setContext(this.inputProviderContext);
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

    /**
     * initializes AllowInput, BackgroundColor, DrawingColor and LineWidth
     */
    protected initializeDefaults(): void
    {
        this.AllowInput = true;
        this.BackgroundColor = "rgb(255,255,255)";
        this.DrawingColor = "rgb(0,0,0)";
        this.LineWidth = 1;
        if(this.hasAttribute("allowInput"))
        {
            this.AllowInput = this.getAttribute("allowInput") === "true";
        }
        if(this.hasAttribute("color"))
        {
            this.DrawingColor = this.getAttribute("color");
        }
        if(this.hasAttribute("lineWidth"))
        {
            this.LineWidth = parseFloat(this.getAttribute("lineWidth"));
        }
        if(this.hasAttribute("backgroundColor"))
        {
            this.BackgroundColor = this.getAttribute("backgroundColor");
        }
    }

    protected createCanvas(): void
    {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.clientWidth ? this.clientWidth : parseInt(this.style.width);
        this.canvas.height = this.clientHeight ? this.clientHeight : parseInt(this.style.height);
        this.appendChild(this.canvas);
    }

    testinstantiation(): void
    {
        // var typehash = {};
        // typehash["Type1"] = Type1;
        // typehash["Type2"] = Type2;
        // typehash["Type3"] = Type3;

        // let t1 = <ITypeName>(new typehash["Type1"]());
        // t1.logClassName();

        // var tname = (<Object>t1).getName();
        // console.log(tname);
    }

    attachedCallback(): void
    {
        console.log("attached");
    }

    detachedCallback(): void
    {
        this.Mouse = null;
        this.canvas = null;
        this.inputProvider.destroy();
    }
    public Mouse: InputListener;
    public DrawingColor: string;
    public BackgroundColor: string;
    public LineWidth: number;
    public inputProvider: InputProvider;
    public inputProviderContext: InputProviderContext;
    public renderer: IDrawingRenderer;
    public recorder: DrawingRecorder;

}
document.registerElement("pdx-drawing", Drawing);

interface ITypeName
{
    logClassName():void;
}

class Type1 implements ITypeName
{
    logClassName():void
    {
        console.log("Type Name: Type1");
    }
    
}
class Type2 implements ITypeName
{
    logClassName():void
    {
        console.log("Type Name: Type2");
    }

}
class Type3 implements ITypeName
{
    logClassName():void
    {
        console.log("Type Name: Type3");
    }
}