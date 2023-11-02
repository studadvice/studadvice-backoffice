import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
    @Input() disabled: Boolean | any;
    @Output() save = new EventEmitter<any>();
    @Input() title: string = '';
    @Input() tooltip: string = '';
    @Input() icon: string = 'save';
    @Input() btnClass: string = 'highlight-bt';

    public clicked: boolean = false;

    public saveButtonLabel: string = 'Enregistrer';
    public forcedDisabled: boolean = false;

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

    public onClick() {
        this.clicked = true;
        this.saveButtonLabel = 'Enregistrement en cours...';
        this.save.emit();
    }

    getTooltip() {
        return this.tooltip || this.saveButtonLabel;
    }
}
