import { ElementRef, Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dock',
    templateUrl: 'dock.html'
})
export class FeatureComponent implements OnInit {
    constructor(private _elementRef: ElementRef) {
        console.log(_elementRef);
    }

    ngOnInit() { }
}