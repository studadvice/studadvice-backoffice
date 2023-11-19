import {Component} from '@angular/core';
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, Validators} from "@angular/forms";
import {FormControlService} from "../../../shared/services/form-control.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-deals-add-modal',
  templateUrl: './deals-add-modal.component.html',
  styleUrls: ['./deals-add-modal.component.css']
})
export class DealsAddModalComponent {
    title: string = '_ADD_DEAL_TITLE_'
    protected readonly faSave = faSave;
    form: any;

    constructor(private formControlService: FormControlService, private formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<DealsAddModalComponent>) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            image: [''],
            start_date: [''],
            end_date: [''],
            status: ['', [Validators.required]],
        });
        this.formControlService.setForm(this.form);
    }
    
    closeDocumentPopup() {
        this.dialogRef.close();
    }

    hasError(name: string, required: string) {

    }

    getFormControl(name: string) {
        return this.formControlService.getFormControl(name);
    }

    saveDeal() {
        
    }
}
