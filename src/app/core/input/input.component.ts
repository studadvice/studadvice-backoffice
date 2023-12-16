import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {AbstractInputComponent} from "./abstract-input.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {faEye, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/link-preview-modal/modal.component";
import {FileInfo} from "../data/demarche";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    host: {
        '[class.inputComponent]': '!isTextarea()',
        '[class.textareaComponent]': 'isTextarea()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent extends AbstractInputComponent implements ControlValueAccessor {
    @Input() required: boolean = false;
    @Input() errorMessage: string = '';
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() min: number = 0;
    @Input() max: number = 0;
    @Input() step: number | string = 1;
    @Input() accept: string = '';
    @Input() multiple: boolean = false;
    @Input() maxLength: string = '';
    @Input() minLength: string = '';
    @Input() displayError: boolean = true;
    @Input() displayWarning: boolean = false;
    @Input() warningMessage: string = '';
    @Input() idInput: string = '';
    @Input() nameInput: string = 'champInputName';
    @Input() showAideSaisieObligatoire: boolean = false;
    @Input() warning: boolean = false;
    @Input() aideSaisie: any;
    @Input() aideSaisieObligatoire: any;
    @Input() hideLabel: any;
    @Input() error: any;
    @Input() textTooltip: any;
    @Input() link: boolean = false;
    @Input() linkText: string = '';
    @Input() previewable: boolean = false;
    @Output() keypress: EventEmitter<any> = new EventEmitter<any>();
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();
    @Output() focus: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();
    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();
    @Input() clearable: boolean = false;
    value: any;
    modalOpen: boolean = false;
    protected readonly faTimesCircle = faTimesCircle;
    protected readonly faEye = faEye;
    fileInfos?: { size: any; name: any; type: any } | null;

    constructor(public dialog: MatDialog) {
        super();
    }

    onChange: any = () => {
    };

    onTouched: any = () => {
    };

    showErrors() {
        return this.inputFormControl.invalid && (this.inputFormControl.dirty || this.inputFormControl.touched);
    }

    isTextarea() {
        return this.type === 'textarea';
    }

    showTooltipError() {
        return this.inputFormControl.invalid && this.inputFormControl.touched;
    }

    clearInput() {
        this.inputFormControl.setValue('');
        this.onClear.emit();
    }

    isText() {
        return this.type === 'text';
    }

    writeValue(obj: any): void {
        if (this.type === 'file') {
            this.fileInfos = obj ? { name: obj.name, size: obj.size, type: obj.type } : null;
        } else {
            this.value = obj;
        }
        this.onChange(obj);
        this.onTouched();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    handleFileChange(event: Event): void {
        const element = event.target as HTMLInputElement;
        if (element.files && element.files.length) {
            const file = element.files[0];
            this.writeValue(file);
        }
    }

    openPreview() {
        if (!this.modalOpen) { // Prevents from opening multiple modals
            this.modalOpen = true;
            const dialogRef = this.dialog.open(ModalComponent, {
                position: {
                    top: '0',
                    left: '0',
                    bottom: '0',
                    right: '0'
                },
                data: {link: this.inputFormControl.value}
            });
            dialogRef.afterClosed().subscribe(result => {
                this.modalOpen = false;
            });
        }
    }
}
