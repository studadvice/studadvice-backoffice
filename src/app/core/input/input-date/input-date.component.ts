import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractInputComponent} from "../abstract-input.component";
import {Overlay, ScrollStrategy} from "@angular/cdk/overlay";
import {PickerType} from "ng-pick-datetime-ex/lib/date-time/date-time.class";

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  host: {
    'class' : 'inputComponent inputDateComponent'
  }
})
export class InputDateComponent extends AbstractInputComponent implements OnInit {

  @Input() required: boolean = false;
  @Input() error = false;
  @Input() placeholder!: string;
  @Input() idInput = 'champDateId' + (AbstractInputComponent.counter++);
  @Input() nameInput = 'champDateName';
  @Input() aideSaisie!: string;
  @Input() showAideSaisieObligatoire = false;
  @Input() aideSaisieObligatoire!: string;

  @Input() timeType!: PickerType;
  @Input() showSeconds = false;
  public scrollStrategy: ScrollStrategy;

  @Input() textTooltip!: string;

  @Output()
  inputChanges = new EventEmitter<any>();
  @Output()
  formatErrors = new EventEmitter<any>();

  displayError = false;
  datePattern: any;
  messageError!: string;
  @Input() displayCustom: boolean = false;
  @Input() displayWarning: boolean = false;
  @Input() warningMessage!: string;

  @Input() autocomplete: string = "on";

  realInput!: string;

  constructor(private overlay: Overlay) {
    super();
    this.scrollStrategy = overlay.scrollStrategies.close();
  }

  ngOnInit() {
    // if (this.timeType === 'both') {
    //   this.datePattern = MY_MOMENT_FORMATS.fullPickerInput;
    //   this.messageError = 'Saisir une valeur correcte au format JJ/MM/AAAA HH:mm';
    // }
    //
    // if (this.timeType === 'calendar') {
    //   this.datePattern = MY_MOMENT_FORMATS.datePickerInput;
    //   this.messageError = 'Saisir une valeur correcte au format JJ/MM/AAAA';
    // }
    //
    // if (this.timeType === 'timer') {
    //   this.datePattern = MY_MOMENT_FORMATS.timePickerInput;
    //   this.messageError = 'Saisir une valeur correcte au format HH:mm';
    // }

    /* TODO : Suppression du reset pour gérer le disable de champ déjà renseigné
    this.inputFormControl.registerOnDisabledChange(isDisabled => {
      if (isDisabled) { this.inputFormControl.reset(); }
    });
    */

  }

  showTooltipError() {
    this.displayError = true;
  }

  hideTooltipError() {
    this.displayError = false;
  }

  inputChanged(event: any) {
    if (!!event) {
      this.checkInput(event.input.value, this.inputFormControl.value);
    }
  }

  whenFocusOut(event: any) {
    this.showTooltipError();
    if (event) {
      this.checkInput(event.target.value, this.inputFormControl.value);
    }
  }

  whenPickerClosed() {
    // if (moment.isMoment(this.inputFormControl.value)) {
    //   this.inputChanges.emit({'realInput': this.realInput, 'moment': this.inputFormControl.value});
    //   this.showTooltipError();
    // }
    // document.getElementById(`buttonCalendar${this.idInput}`).focus();
  }

  checkInput(eventValue: string, formControlValue: any) {
    let dateYearZero = false;
    // Vérification stricte de la date saisie et vérification du caractère obligatoire du champ
    // if (!(moment(eventValue, this.datePattern, true).isValid())) {
    //   if (eventValue) {
    //     this.formatErrors.emit([{code: 'CUSTOM_VALIDATION_ERROR', message: this.messageError}]);
    //   } else if (this.required) {
    //     this.formatErrors.emit([{code: 'OBJECT_MISSING_REQUIRED_PROPERTY', message: "Champ obligatoire"}]);
    //   }
    // } else {
    //   dateYearZero = moment(eventValue, this.datePattern).isSame('0000-01-01', 'year');
    // }
    // if (!!eventValue) {
    //   this.realInput = eventValue;
    //   if (dateYearZero) {
    //     this.realInput = " ";
    //   }
    //   if (!moment.isMoment(formControlValue)  || dateYearZero) {
    //     // qu'importe le format de vérification le but étant de renvoyer un moment invalide
    //     this.inputChanges.emit({'realInput': this.realInput, 'moment': moment(this.realInput, 'DD/MM/YYYY', true)});
    //     this.formatErrors.emit([{code: 'CUSTOM_VALIDATION_ERROR', message: this.messageError}]);
    //   }
    // }
  }
}

@Component({
  selector: 'app-input-date-error',
  template: '<ng-content></ng-content>'
})
export class InputDateErrorComponent {
}