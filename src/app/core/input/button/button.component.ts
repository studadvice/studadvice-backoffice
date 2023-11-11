import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSave} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
    host: {'class': 'buttonComponent'}
})
export class ButtonComponent implements OnInit {
    @Input() disabled: Boolean | any;
    @Output() save = new EventEmitter<any>();
    @Input() title: string = '';
    @Input() tooltip: string = '';
    @Input() icon: any = faSave;
    @Input() btnClass: string = 'highlight-bt';

    public clicked: boolean = false;

    public saveButtonLabel: string = 'Enregistrer';
    public forcedDisabled: boolean = false;
    @Input() customClass: string = '';

    ngOnInit() {
        this.saveButtonLabel = this.title;
    }

    disable() {
        this.forcedDisabled = true;
    }

    enable() {
        this.forcedDisabled = false;
        this.clicked = false;
        this.saveButtonLabel = this.title;
    }

    public onClick(event: any) {
        this.clicked = true;
        // this.saveButtonLabel = 'Enregistrement en cours...';
        this.save.emit(event);
    }

    getTooltip() {
        return this.tooltip || this.saveButtonLabel;
    }
}
