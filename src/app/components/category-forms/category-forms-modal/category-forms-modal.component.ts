import {Component, OnInit} from '@angular/core';
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FormControlService} from "../../../shared/services/form-control.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../../../shared/dataservices/data.service";
import {MatDialogRef} from "@angular/material/dialog";
import { Process } from 'src/app/core/data/demarche';

@Component({
  selector: 'app-category-forms-modal',
  templateUrl: './category-forms-modal.component.html',
  styleUrls: ['./category-forms-modal.component.css']
})
export class CategoryFormsModalComponent implements OnInit  {
    title: string = '_EDIT_CATEGORY_'
    protected readonly faSave = faSave;
    administrativeProcesses: any;
    form: any;
    category: any;

    constructor(private formControlService: FormControlService, private formBuilder: FormBuilder,
                private dataService: DataService, private dialogRef: MatDialogRef<CategoryFormsModalComponent>) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            description: ['' , [Validators.required, Validators.minLength(5)]],
            image: ['' , [Validators.required]],
            administrativeProcesses: [[] , [Validators.required]],
        });
        this.formControlService.setForm(this.form);
    }

    ngOnInit(): void {
        // this.getProcess();
        this.getProcess();
        // get data from dialog
        const data = this.dialogRef._containerInstance._config.data;
        if (data) {
            this.category = data.category;
            this.updateCategory();
        }
    }

    private getProcess() {
        this.dataService.getAllAdministrativeProcess().subscribe({
            next: (data: any) => {
                this.administrativeProcesses = this.transformProcesses(data.content);
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    private transformProcesses(processes: Process[]): Process[] {
        return processes.map(process => ({
            ...process,
            value: {
                id: process.id,
            },
            label: process.name
        }));
    }

    saveCategory() {
        if (this.form.valid) {
            this.dataService.updateCategory(this.category.id, this.form.value).subscribe(
                {
                    next: (response: any) => {
                        this.dialogRef.close();
                    },
                    error: (error: any) => {
                        console.log(error);
                    }
                }
            );
        }
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

    updateCategory() {
        this.form.patchValue({
            name: this.category.name,
            description: this.category.description,
            image: this.category.image,
            administrativeProcesses: this.category.administrativeProcesses
        });
    }
}
