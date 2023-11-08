import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faEye, faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ModalComponent} from "../../core/modal/link-preview-modal/modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ButtonComponent} from "../../core/input/button/button.component";
import {FormControlService} from "../../shared/services/form-control.service";

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

    @ViewChild('addResourceButton', { static: false }) addResourceButton!: ButtonComponent;
    @ViewChild('addStepButton', { static: false }) addStepButton!: ButtonComponent;
    @ViewChild('submitButton', { static: false }) submitButton!: ButtonComponent;

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
                private formControlService: FormControlService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            etapes: this.formBuilder.array([]),
            resources: this.formBuilder.array([])
        });
        this.formControlService.setForm(this.form);
    }

    // Utilitaires pour obtenir des FormArray spécifiques
    get etapes(): FormArray {
        return this.form.get('etapes') as FormArray;
    }

    get resources(): FormArray {
        return this.form.get('resources') as FormArray;
    }

    // Méthode pour ajouter une étape au FormArray avec des FormControl spécifiques
    addStep() {
        const stepGroup = this.formBuilder.group({
            titre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            description: new FormControl('', [Validators.required, Validators.minLength(5)]),
            documents: new FormControl([], Validators.required), // Assumption: 'documents' is an array of strings
            lien: new FormControl('', [Validators.required, Validators.minLength(5)])
        });
        this.etapes.push(stepGroup);
        this.addStepButton.enable();
    }

    // Méthode pour ajouter une ressource au FormArray avec des FormControl spécifiques
    addResource() {
        const resourceGroup = this.formBuilder.group({
            titre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            description: new FormControl('', [Validators.required, Validators.minLength(5)]),
            url: new FormControl('', [Validators.required, Validators.minLength(5)]),
            image: new FormControl('', Validators.required)
        });
        this.resources.push(resourceGroup);
        this.addResourceButton.enable();
    }

    // Méthode pour obtenir un contrôle spécifique d'un FormGroup
    getControl(group: AbstractControl, controlName: string): FormControl {
        return this.formControlService.getControl(group, controlName);
    }

    // Méthode pour récupérer un FormControl en utilisant le nom du contrôle
    getFormControl(name: string) {
        return this.formControlService.getFormControl(name);
    }

    // Méthode pour vérifier s'il y a une erreur spécifique sur un contrôle
    hasError(controlName: string, errorName: string): boolean {
        return this.formControlService.hasError(controlName, errorName);
    }

    // Méthode pour supprimer une étape du FormArray
    deleteStep(index: number) {
        this.etapes.removeAt(index);
    }

    // Méthode pour supprimer une ressource du FormArray
    deleteResource(index: number) {
        this.resources.removeAt(index);
    }

    // Méthode pour traiter la soumission du formulaire
    submit() {
        if (this.form.valid) {
            console.log('Form Data:', this.form.value);
            this.submitButton.enable();
        } else {
            console.error('Form Invalid:', this.form.errors);
            this.submitButton.enable();
        }
    }

}
