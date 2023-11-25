import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractInputComponent} from "../abstract-input.component";

export declare type CompareWithFn = (o1: any, o2: any) => boolean;

@Component({
    selector: 'app-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.css'],
    host: {'class': 'selectComponent'}
})
export class InputSelectComponent extends AbstractInputComponent {
    @Input() id = 'champSelectId' + AbstractInputComponent.counter++;
    @Input() required: boolean = false;
    @Input() errorMessage: string = '';
    @Input() showAideSaisie: boolean = false;
    @Input() aideSaisie: string = '';
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    @Input() options: any[] = [];
    @Input() placeholder: string = '';
    @Input() hideLabel: any;
    @Input() displayError: boolean = true;
    @Input() bindLabel: string = '';
    @Input() bindValue: string = '';
    @Input() searchFn = null;
    @Input() compareWith: CompareWithFn = false as any;
    @Input() clearable: boolean = false;
    @Input() error: boolean = false;
    @Input() hasLabel: boolean = false;
    @Input() isInvalid: boolean = false;
    @Input() textTooltip: any;
    @Input() labelForAria: any;
    @Input() multiple: boolean = false;

    constructor() {
        super();
    }

    onChange($event: Event) {
        this.change.emit($event);
    }

    showTooltipError() {
        this.displayError = false;
    }
}
