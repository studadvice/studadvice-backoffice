import {Component, OnInit} from '@angular/core';
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FormControlService} from "../../../shared/services/form-control.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../../../shared/dataservices/data.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-forms-modal',
  templateUrl: './category-forms-modal.component.html',
  styleUrls: ['./category-forms-modal.component.css']
})
export class CategoryFormsModalComponent implements OnInit  {
    title: string = '_EDIT_CATEGORY_'
    protected readonly faSave = faSave;
    process: any;
    form: any;

    constructor(private formControlService: FormControlService, private formBuilder: FormBuilder,
                private dataService: DataService, private dialogRef: MatDialogRef<CategoryFormsModalComponent>) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            description: ['' , [Validators.required, Validators.minLength(5)]],
            process: ['' , [Validators.required]],
        });
        this.formControlService.setForm(this.form);
        this.getProcess();

        // get data from dialog
        const data = this.dialogRef._containerInstance._config.data;
        if (data) {
            if (data.category) {
                this.form.patchValue(data.category);
                this.process = data.process;
            }
        }
    }

    private getProcess() {
        this.form.get('process').valueChanges.subscribe((value: any) => {
            this.process = value;
        });
    }

    saveDocument() {

    }

    ngOnInit(): void {
    }

    getFormControl(name: string) {
        return this.formControlService.getFormControl(name);
    }

    hasError(controlName: string, errorName: string): boolean {
        return this.formControlService.hasError(controlName, errorName);
    }

    closeDocumentPopup() {
        this.dialogRef.close();
    }
}
