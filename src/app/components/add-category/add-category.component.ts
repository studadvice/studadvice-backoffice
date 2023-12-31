import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ButtonComponent} from "../../core/input/button/button.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControlService} from "../../shared/services/form-control.service";
import {faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DataService} from "../../shared/dataservices/data.service";
import {Router} from "@angular/router";
import {Process} from "../../core/data/demarche";

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
    administrativeProcesses: Process[] = [];

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
                private formControlService: FormControlService,
                private dataService: DataService,
                public router: Router,
    ) {
    }

    ngOnInit() {
        this.getProcess();
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            image: ['', [Validators.required]],
            administrativeProcesses: [[], [Validators.required]],
            color: ['', [Validators.required, Validators.minLength(7)]],
        });
        this.formControlService.setForm(this.form);
    }

    submit() {
        if (this.form.valid) {
            this.dataService.addCategory(this.form.value).subscribe((response) => {
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

    getProcess(): void {
        this.dataService.getAllAdministrativeProcess()
            .subscribe(
                {
                    next: (response: any) => {
                        this.administrativeProcesses = response.content;
                        this.administrativeProcesses = this.administrativeProcesses.map((process) => {
                            return {
                                ...process,
                                value: {
                                    id: process.id,
                                },
                                label: process.name
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
        const element = $event!.target as HTMLInputElement;
        if (element.files && element.files.length) {
            const file = element.files[0];
            this.form.patchValue({
                image: file
            });
        }
    }
}
