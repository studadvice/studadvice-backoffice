import {Directive, Input, OnChanges, SimpleChanges} from "@angular/core";
import {FormControl} from "@angular/forms";

@Directive()
export class AbstractInputComponent implements OnChanges {

    protected static counter = 0;

    @Input() disabled: boolean = false;
    @Input() inputFormControl: FormControl = new FormControl();
    @Input() normalizer: (str: string) => string = (str: string) => str;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['disabled'] && changes) {
            changes['disabled'].currentValue === true ? this.inputFormControl.disable() : this.inputFormControl.enable();
        }
    }

    isDisabled(): boolean {
        return this.inputFormControl.disabled;
    }

    applyTransformationAndSetCaretPosition(input: HTMLInputElement | HTMLTextAreaElement) {

        if (input.type !== 'text' && input.type !== 'textarea') {
            return;
        }

        if (!this.normalizer || input.value == null) {
            return;
        }

        // on applique la transformation passée en paramètre de l'input
        let transformedInputText = this.normalizer(input.value);
        if (transformedInputText === input.value) {
            return;
        }

        // Sauvegarde la position du caret
        let start = input.selectionStart;
        let end = input.selectionEnd;

        // Calcul de la position du caret dans le cas où la tansformation a apporté/supprimé de nouveaux caractères
        let sourceLength = input.value.length;
        let destinationLength = transformedInputText.length;
        if (sourceLength !== destinationLength && start && end) {
            start += destinationLength - sourceLength;
            end += destinationLength - sourceLength;
        }

        input.value = transformedInputText;
        input.setSelectionRange(start, end);

        this.inputFormControl.setValue(input.value);
    }

}