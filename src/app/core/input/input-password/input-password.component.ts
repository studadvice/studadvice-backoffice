import {Component, Input, ViewChildren} from '@angular/core';
import {AbstractInputComponent} from "../abstract-input.component";
import {faEye} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent extends AbstractInputComponent {
    @Input() required: boolean = false;
    @Input() error: boolean = false;
    @Input() warning: boolean = false;
    @Input() aideSaisie: string = '';
    @Input() label: string = '';
    @Input() id: string = 'champPassword' + AbstractInputComponent.counter++;
    @Input() nameInput: string = '';
    @Input() btnClass: string = '';
    @Input() btnLabel: string = '';
    @Input() tooltipClass: string = '';
    @Input() tooltipDelay: number = 0;
    @Input() tooltipAria: string = '';
    @Input() tooltipLabel: string = '';
    @ViewChildren("password") password: any;
    @Input() errorMessages: string = '';
    @Input() warningMessages: string = '';
    @Input() placeholder: string = '';
    faEye = faEye;


    togglePassword($event: any) {
        if (this.password.nativeElement.type === 'password') {
            this.password.nativeElement.type = 'text';
        } else {
            this.password.nativeElement.type = 'password';
        }

    }
}
