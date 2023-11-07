import {Component} from "@angular/core";

@Component({
    selector: 'action-button',
    template: '<ng-content></ng-content>',
    host: {'class': 'action-button'}
})
export class ActionButtonComponent {
}