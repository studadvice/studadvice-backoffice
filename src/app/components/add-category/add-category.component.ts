import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ButtonComponent} from "../../core/input/button/button.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControlService} from "../../shared/services/form-control.service";
import {faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DataService} from "../../shared/dataservices/data.service";
import {Router} from "@angular/router";
import {Procedure} from "../../core/data/demarche";

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
    form!: FormGroup;

    @ViewChild('addProcedureButton', {static: false}) addProcedureButton!: ButtonComponent;
    @ViewChild('submitButton', {static: false}) submitButton!: ButtonComponent;
    @ViewChild('removeSubCategoryButton', {static: false}) removeSubCategoryButton!: ButtonComponent;
    protected readonly faTrash = faTrash;
    protected readonly faPlus = faPlus;
    protected readonly faSave = faSave;
    procedures: Procedure[] = [];

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
                private formControlService: FormControlService,
                private dataService: DataService,
                public router: Router,
    ) {
    }

    ngOnInit() {
        this.getProcedure();
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            image: ['', [Validators.required]],
            procedures: ['', [Validators.required]],
        });
        this.formControlService.setForm(this.form);
    }

    submit() {
        if (this.form.valid) {
            this.dataService.addCategory(this.form.value).subscribe((response) => {
                console.log(response);
                this.router.navigate(['category']);
            });
        }
    }

    getControl(group: AbstractControl, controlName: string): FormControl {
        return this.formControlService.getControl(group, controlName);
    }

    getFormControl(name: string) {
        return this.formControlService.getFormControl(name);
    }

    hasError(controlName: string, errorName: string): boolean {
        return this.formControlService.hasError(controlName, errorName);
    }

    getProcedure(): void {
        this.dataService.getProcedures()
            .subscribe(
                {
                    next: (response) => {
                        this.procedures = response;
                        this.procedures = this.procedures.map((procedure) => {
                            return {
                                ...procedure,
                                value: procedure.id,
                                label: procedure.name
                            }
                        });
                    },
                    error: (error) => {
                        console.log(error);
                    }
                }
            )
    }

    handleFileChange($event: Event) {
        const element = event!.target as HTMLInputElement;
        if (element.files && element.files.length) {
            const file = element.files[0];
            this.form.patchValue({
                image: file
            });
        }
    }
}
