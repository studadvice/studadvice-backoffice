import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FormControlService {

    private form!: FormGroup;

    constructor() {
    }

    getControl(group: AbstractControl, controlName: string): FormControl {
        return group.get(controlName) as FormControl;
    }

    getFormControl(name: string) {
        return this.form.get(name) as FormControl;
    }

    hasError(controlName: string, errorName: string): boolean {
        const control = this.form.get(controlName);
        return control! && control.hasError(errorName) && (control.dirty || control.touched);
    }

    setForm(form: FormGroup) {
        this.form = form;
    }
}
