import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {ButtonComponent} from "../../core/input/button/button.component";
import {FormControlService} from "../../shared/services/form-control.service";
import {DataService} from "../../shared/dataservices/data.service";
import {Router} from "@angular/router";
import {Document, Process, Step} from "../../core/data/demarche";
import {Resource} from "../../core/data/resources";
import { environment } from 'src/environments/environments';

@Component({
    selector: 'app-forms',
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
    @Input() process?: Process;
    @Output() processChange = new EventEmitter<{editProcess: boolean, process: Process}>();
    documents: Document[] = [];
    countries: any[] = [];
    universities: any[] = [];

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
            minAge: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
            maxAge: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
            nationalities: [[], [Validators.required]],
            universities: [[], [Validators.required]],
            steps: this.formBuilder.array([]),
            image: ['', [Validators.required]],
        });
        if (this.process) {
            this.title = '_EDIT_PROCEDURE_';
            this.updateProcess();
        }
        this.formControlService.setForm(this.form);
        this.getAllDocuments();
        this.getUniversity();
        this.getCountries();
    }

    getCountries() {
        this.dataService.loadCountries().subscribe(
            {
                next: (response: any) => {
                    this.countries = response.map(
                        (country: any) => {
                            return {
                                ...country,
                                value: country.name.common,
                                label: country.flag + ' ' + country.name.common,
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

    getAllDocuments() {
        this.dataService.getAllDocuments().subscribe(
            {
                next: (response: any) => {
                    this.documents = response.content.map(
                        (document: any) => {
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
            documents: new FormControl([] as any[]),
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
            image: new FormControl(''),
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
            if (this.process) {
                this.updateProcedureBeforeSubmit();
            }
            else {
                this.addProcess();
            }
        } else {
            this.submitButton.enable();
        }
    }

    private addProcess() {
        this.dataService.addProcess(this.form.value).subscribe(
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
        this.dataService.updateProcess(this.process!.id, this.form.value).subscribe({
            next: (response) => {
                this.processChange.emit({editProcess: false, process: this.process!});
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

    private updateProcess() {
        const steps = this.process!.steps.map(step => this.formBuilder.group({
            name: new FormControl(step.name, [Validators.required, Validators.minLength(5)]),
            description: new FormControl(step.description, [Validators.required, Validators.minLength(5)]),
            documents: new FormControl(step.documents, Validators.required),
            resources: this.formBuilder.array([]),
        }));

        this.form = this.formBuilder.group({
            name: new FormControl(this.process!.name, [Validators.required, Validators.minLength(5)]),
            description: new FormControl(this.process!.description, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            minAge: [this.process!.minAge, [Validators.required, Validators.min(0), Validators.max(100)]],
            maxAge: [this.process!.maxAge, [Validators.required, Validators.min(0), Validators.max(100)]],
            nationalities: [this.process!.nationalities, [Validators.required]],
            image: [this.process!.image, [Validators.required]],
            universities: [this.process!.universities, [Validators.required]],
            steps: this.formBuilder.array(steps),
        });

        this.process!.steps.forEach((step, index) => {
            if (step.resources){
                step.resources.forEach(resource => {
                    this.addResource(index, resource);
                });
            }
        });
    }

    handleFileChange($event: Event, etapeIndex: number, resourcesIndex: number) {
            const element = event!.target as HTMLInputElement;
            if (element.files && element.files.length) {
            const file = element.files[0];
            const resourceGroup = this.getResources(etapeIndex).at(resourcesIndex) as FormGroup;
            resourceGroup.patchValue({ image: file.name });
    }
    }

    getUniversity() {
        this.dataService.getUniversities(environment.universityCountry).subscribe(
            {
                next: (response: any) => {
                    this.universities = response.map(
                        (university: any) => {
                            return {
                                ...university,
                                value: university.name,
                                label: university.name,
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

    handleFileChangeForProcess($event: Event) {
        const element = event!.target as HTMLInputElement;
        if (element.files && element.files.length) {
            const file = element.files[0];
            this.form.patchValue({ image: file.name });
        }
    }
}