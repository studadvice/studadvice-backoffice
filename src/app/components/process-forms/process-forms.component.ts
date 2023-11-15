import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {ButtonComponent} from "../../core/input/button/button.component";
import {FormControlService} from "../../shared/services/form-control.service";
import {DataService} from "../../shared/dataservices/data.service";
import {Router} from "@angular/router";
import {Procedure, Step, Document} from "../../core/data/demarche";
import {Resource} from "../../core/data/resources";

@Component({
    selector: 'app-formulaire',
    templateUrl: './process-forms.component.html',
    styleUrls: ['./process-forms.component.css']
})
export class ProcessFormsComponent implements OnInit {

    form!: FormGroup;
    faTrash = faTrash;
    faSave = faSave;

    @ViewChild('addResourceButton', {static: false}) addResourceButton!: ButtonComponent;
    @ViewChild('addStepButton', {static: false}) addStepButton!: ButtonComponent;
    @ViewChild('submitButton', {static: false}) submitButton!: ButtonComponent;

    @Input() title: string = '_ADD_PROCEDURE_';
    @Input() procedure?: Procedure;
    @Output() procedureChange = new EventEmitter<{editProcedure: boolean, procedure: Procedure}>();
    documents: Document[] = [];

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
                private formControlService: FormControlService,
                private dataService: DataService,
                private router: Router,
                ) {
    }

    get steps(): FormArray {
        return this.form.get('steps') as FormArray;
    }

    getResources(etapeIndex: number): FormArray {
        const currentStepFormGroup = this.steps.controls[etapeIndex] as FormGroup;
        return currentStepFormGroup.get('resources') as FormArray;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            steps: this.formBuilder.array([]),
        });
        if (this.procedure) {
            this.title = '_EDIT_PROCEDURE_';
            this.updateProcedure();
        }
        this.formControlService.setForm(this.form);
        this.getAllDocuments();
    }

    getAllDocuments() {
        this.dataService.getDocuments().subscribe(
            {
                next: (response) => {
                    this.documents = response.map(
                        (document) => {
                            return {
                                ...document,
                                value: document.id,
                                label: document.name,
                            }
                        }
                    );
                },
                error: (error) => {
                    console.log(error);
                }
            }
        );
    }

    addStep(newStep?: Step) {
        const stepGroup = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            description: new FormControl('', [Validators.required, Validators.minLength(5)]),
            documents: new FormControl([] as any[], Validators.required),
            resources: this.formBuilder.array([] as Resource[]),
        });
        if (newStep) {
            stepGroup.patchValue(newStep);
        }
        this.steps.push(stepGroup);
        if (this.addStepButton) {
            this.addStepButton.enable();
        }
    }

    addResource(etapeIndex: number, newResource?: Resource) {
        const resourceGroup = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            description: new FormControl('', [Validators.required, Validators.minLength(5)]),
            url: new FormControl('', [Validators.required, Validators.minLength(5)]),
            image: new FormControl('', Validators.required),
        });
        if (newResource) {
            resourceGroup.patchValue(newResource);
        }
        this.getResources(etapeIndex).push(resourceGroup);
        if (this.addResourceButton) {
            this.addResourceButton.enable();
        }
    }

    deleteStep(index: number) {
        this.steps.removeAt(index);
    }

    submit() {
        if (this.form.valid) {
            if (this.procedure) {
                this.updateProcedureBeforeSubmit();
            }
            else {
                this.addProcedure();
            }
        } else {
            this.submitButton.enable();
        }
    }

    private addProcedure() {
        this.dataService.addProcedure(this.form.value).subscribe(
            {
                next: (response) => {
                    if (this.submitButton) {
                        this.submitButton.enable();
                    }
                    this.router.navigate(['dashboard']);
                },
                error: (error) => {
                    this.submitButton.enable();
                }
            }
        );
    }

    private updateProcedureBeforeSubmit() {
        this.dataService.updateProcedure(this.procedure!.id, this.form.value).subscribe({
            next: (response) => {
                this.procedureChange.emit({editProcedure: false, procedure: this.procedure!});
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                console.log(error);
            }
        });
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

    deleteResource(etapeIndex: number, index: number) {
        this.getResources(etapeIndex).removeAt(index);
    }

    private updateProcedure() {
        const steps = this.procedure!.steps.map(step => this.formBuilder.group({
            name: new FormControl(step.name, [Validators.required, Validators.minLength(5)]),
            description: new FormControl(step.description, [Validators.required, Validators.minLength(5)]),
            documents: new FormControl(step.documents, Validators.required),
            resources: this.formBuilder.array([]),
        }));

        this.form = this.formBuilder.group({
            name: new FormControl(this.procedure!.name, [Validators.required, Validators.minLength(5)]),
            description: new FormControl(this.procedure!.description, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            steps: this.formBuilder.array(steps),
        });

        this.procedure!.steps.forEach((step, index) => {
            step.resources.forEach(resource => {
                this.addResource(index, resource);
            });
        });
    }

    handleFileChange($event: Event, etapeIndex: number, resourcesIndex: number) {
            const element = event!.target as HTMLInputElement;
            if (element.files && element.files.length) {
            const file = element.files[0];
            const resourceGroup = this.getResources(etapeIndex).at(resourcesIndex) as FormGroup;
            resourceGroup.patchValue({ image: file });
    }
    }
}