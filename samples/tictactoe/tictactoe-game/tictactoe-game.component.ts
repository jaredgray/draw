import { Component, OnInit, ElementRef } from '@angular/core';

import { DomService } from "../../../app/services/domservice/dom.service";
import { GameService } from "../gameservice/game.service";
import { UserService } from "../userservice/user.service";
import { User, Turn, GameContext } from "../models/index";

import { DrawingRecorder } from "../../../drawing/DrawingRecorder";
import { CanvasDrawingRenderer } from "../../../drawing/canvas/CanvasDrawingRenderer";
import { Pencil } from "../../../drawing/canvas/Pencil";
import { InputListener } from "../../../InputListener"
import { InputProviderContext } from "../../../drawing/InputProviderContext";
import { InputProvider } from "../../../drawing/InputProvider";

@Component({
    moduleId: module.id,
    selector: 'tictactoe-game',
    templateUrl: 'tictactoe-game.component.html',
    providers: [ GameService ]
})
export class TicTacToeGameComponent implements OnInit {
    constructor(private _element: ElementRef,
        private domService: DomService,
        private gameService: GameService) {

    }

    canvas: HTMLCanvasElement;
    public AllowInput: boolean;
    public Mouse: InputListener;
    public DrawingColor: string;
    public BackgroundColor: string;
    public LineWidth: number;
    public inputProvider: InputProvider;
    public inputProviderContext: InputProviderContext;
    public renderer: IDrawingRenderer;
    public recorder: DrawingRecorder;

    public gameContext: GameContext;

    ngOnInit() {
        this.canvas = this._element.nativeElement.firstChild;

        this.Mouse = new InputListener(this.canvas);
        this.inputProviderContext = new InputProviderContext();
        this.inputProviderContext.tension = 0.4;
        this.inputProviderContext.minDistanceForNewPoint = .01;
        this.inputProviderContext.input = this.Mouse;
        this.inputProvider = new InputProvider();
        this.inputProvider.setContext(this.inputProviderContext);

        this.inputProvider.AllowInput = this.AllowInput;

        this.recorder = new DrawingRecorder(this.inputProvider);
        this.renderer = new CanvasDrawingRenderer(this.canvas);
        var brush = new Pencil();
        brush.setSize(this.LineWidth);
        brush.setColor(this.DrawingColor);
        this.renderer.setBrush(brush);
        this.recorder.setRenderer(this.renderer);
        this.recorder.startContinuousRendering();

        this.initializeDefaults();
    }

    /**
     * initializes AllowInput, BackgroundColor, DrawingColor and LineWidth
     */
    protected initializeDefaults(): void {
        this.AllowInput = true;
        this.BackgroundColor = "rgb(255,255,255)";
        this.DrawingColor = "rgb(0,0,0)";
        this.LineWidth = 1;
        // if(this.hasAttribute("allowInput"))
        // {
        //     this.AllowInput = this.getAttribute("allowInput") === "true";
        // }
        // if(this.hasAttribute("color"))
        // {
        //     this.DrawingColor = this.getAttribute("color");
        // }
        // if(this.hasAttribute("lineWidth"))
        // {
        //     this.LineWidth = parseFloat(this.getAttribute("lineWidth"));
        // }
        // if(this.hasAttribute("backgroundColor"))
        // {
        //     this.BackgroundColor = this.getAttribute("backgroundColor");
        // }
        let thisref = this;
        this.domService.query(window).resize(function() {
            thisref.onWindowSizeChange();
        });
        this.onWindowSizeChange();
    }

    onWindowSizeChange() {
        var screenwidth = this.domService.query(window).width();
        var screenheight = this.domService.query(window).height();

        let $canvas = this.domService.query(this.canvas);


        $canvas.height(screenheight);
        $canvas.width(screenwidth);
    }

    newGame()
    {
        let time = new Date().getUTCMilliseconds().toString();
        this.gameContext = this.gameService.newGame("", time.toString());
    }
}