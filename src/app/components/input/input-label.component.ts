import {Component} from "@angular/core";

@Component({
    selector: 'app-input-label',
    template: '<ng-content></ng-content>',
    host: {'class': 'label-inline'}
})
export class InputComponentLabel {
}