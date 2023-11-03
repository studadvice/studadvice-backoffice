import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-formulaire',
    templateUrl: './formulaire.component.html',
    styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
    titleFormControl = new FormControl();
    descriptionFormControl = new FormControl();
    documentsFormControl = new FormControl();
    options: any[] = [
        {value: 'Option 1', label: 'Option 1'},
        {value: 'Option 2', label: 'Option 2'},
    ];
    form!: FormGroup;
    etapeForm: FormArray = this.formBuilder.array([]);
    faTrash = faTrash;
    faPlus = faPlus;
    faSave = faSave;

    constructor(private formBuilder: FormBuilder) {
    }

    get formData() {
        return <FormArray>this.form.get('etapeForm')
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: this.titleFormControl,
            description: this.descriptionFormControl,
            documents: this.documentsFormControl,
            etapeForm: this.etapeForm
        });

        this.ajouterEtape("Etape 1", "Description 1");
        this.ajouterEtape("Etape 2", "Description 2");
    }

    supprimerEtape(i: number) {
        this.etapeForm.removeAt(i);
    }

    ajouterEtape(titleDefault: string = '', descriptionDefault: string = '', documentsDefault: string[] = [], texteDefault: string = '', lienDefault: string = '') {
        this.etapeForm.push(this.formBuilder.group({
            titre: [titleDefault, Validators.required],
            description: [descriptionDefault, Validators.required],
            documents: [documentsDefault, Validators.required],
            lien: [lienDefault, Validators.required],
            texte: [texteDefault, Validators.required]
        }));
    }

    getControl(control: AbstractControl, controlName: string): FormControl | null {
        const formGroup = control as FormGroup;
        const formControl = formGroup.get(controlName);
        return formControl instanceof FormControl ? formControl : null;
    }

    submit() {

    }
}
