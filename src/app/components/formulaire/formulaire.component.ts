import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {ButtonComponent} from "../../core/input/button/button.component";
import {FormControlService} from "../../shared/services/form-control.service";
import {DataService} from "../../shared/dataservices/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-formulaire',
    templateUrl: './formulaire.component.html',
    styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

    form!: FormGroup;
    faTrash = faTrash;
    faPlus = faPlus;
    faSave = faSave;

    @ViewChild('addResourceButton', {static: false}) addResourceButton!: ButtonComponent;
    @ViewChild('addStepButton', {static: false}) addStepButton!: ButtonComponent;
    @ViewChild('submitButton', {static: false}) submitButton!: ButtonComponent;

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
                private formControlService: FormControlService,
                private dataService: DataService,
                private router: Router,
                ) {
    }

    get etapes(): FormArray {
        return this.form.get('etapes') as FormArray;
    }

    get resources(): FormArray {
        return this.form.get('resources') as FormArray;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            etapes: this.formBuilder.array([]),
            resources: this.formBuilder.array([])
        });
        this.formControlService.setForm(this.form);
    }

    addStep() {
        const stepGroup = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            description: new FormControl('', [Validators.required, Validators.minLength(5)]),
            documents: new FormControl([], Validators.required),
            lien: new FormControl('', [Validators.required, Validators.minLength(5)])
        });
        this.etapes.push(stepGroup);
        this.addStepButton.enable();
    }

    addResource(etapeIndex: number) {
        const resourceGroup = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            description: new FormControl('', [Validators.required, Validators.minLength(5)]),
            url: new FormControl('', [Validators.required, Validators.minLength(5)]),
            image: new FormControl('', Validators.required),
            etapeIndex: new FormControl(etapeIndex)
        });

        this.resources.push(resourceGroup);
        this.addResourceButton.enable();
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

    deleteStep(index: number) {
        this.etapes.removeAt(index);
        const resources = this.resources.value;
        for (let i = resources.length - 1; i >= 0; i--) {
            if (resources[i].etapeIndex === index) {
                this.resources.removeAt(i);
            }
        }
    }

    deleteResource(index: number) {
        this.resources.removeAt(index);
    }

    submit() {
        if (this.form.valid) {
            console.log('Form Data:', this.form.value);
            this.dataService.addProcedure(this.form.value).subscribe(
                {
                    next: (response) => {
                        console.log('Response:', response);
                        this.submitButton.enable();
                        this.router.navigate(['dashboard']);
                    },
                    error: (error) => {
                        console.error('Error:', error);
                        this.submitButton.enable();
                    }
                }
            );
        } else {
            console.error('Form Invalid:', this.form.errors);
            this.submitButton.enable();
        }
    }

}