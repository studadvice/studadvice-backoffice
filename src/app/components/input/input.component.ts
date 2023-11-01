import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractInputComponent} from "./abstract-input.component";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  host: {
    '[class.inputComponent]': '!isTextarea()',
    '[class.textareaComponent]': 'isTextarea()'
  }
})
export class InputComponent extends AbstractInputComponent {
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
  @Output() keypress: EventEmitter<any> = new EventEmitter<any>();
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClear: EventEmitter<any> = new EventEmitter<any>();
  @Output() keydown: EventEmitter<any> = new EventEmitter<any>();
  @Input() clearable: boolean = false;

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
    return false;
  }
}
