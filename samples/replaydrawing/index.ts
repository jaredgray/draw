// import { Drawing } from "../../elements/Drawing";
// import { DrawingRecorder } from "../../drawing/DrawingRecorder";
// import { CanvasDrawingRenderer } from "../../drawing/canvas/CanvasDrawingRenderer";
// import { Pencil } from "../../drawing/canvas/Pencil";
export class Recorder
{
    constructor()
    {
        console.log("Recorder.ctor");
        document.addEventListener("DOMContentLoaded", this.load.bind(this), false);

    }
    private drawing: Drawing;
    private drawingcopy: Drawing;
    private recorder: DrawingRecorder;
    private renderer: CanvasDrawingRenderer;
    private playbackrenderer: CanvasDrawingRenderer;
    private brush: IDrawingBrush;
    private playbackdrawing: Drawing;


    private load()
    {
        if (!window["ExtendedDom"])
        {
            setTimeout(this.load.bind(this), 1);
            return;
        }
        var playbutton = document.getElementById("play");
        var recordbutton = document.getElementById("record");
        playbutton.onclick = this.play.bind(this);
        recordbutton.onclick = this.record.bind(this);
        this.drawing = <Drawing>window["ExtendedDom"]["maindrawing"];
        this.drawingcopy = <Drawing>window["ExtendedDom"]["maindrawingcopy"];
        this.playbackdrawing = <Drawing>window["ExtendedDom"]["playbackdrawing"];
        this.recorder = new DrawingRecorder(this.drawing.inputProvider);
        let brush = new Pencil();
        brush.setSize(1);
        brush.setColor(this.drawingcopy.DrawingColor);
        this.renderer = new CanvasDrawingRenderer(this.drawingcopy.canvas);
        this.renderer.setBrush(brush);
        this.recorder.setRenderer(this.renderer);
        this.recorder.startContinuousRendering();
    }

    private record(): void
    {
        console.log("recording...");
        this.recorder.stopRecording();
        this.recorder.clear();
        this.recorder.record();
    }

    private play(): void
    {
        console.log("playing...");
        this.playbackrenderer = new CanvasDrawingRenderer(this.playbackdrawing.canvas);
        let brush = new Pencil();
        brush.setSize(1);
        brush.setColor(this.playbackdrawing.DrawingColor);        
        this.playbackrenderer.setBrush(brush);
        this.recorder.setRenderer(this.playbackrenderer);
        this.recorder.playback(0);
    }

}
var recorder = new Recorder();