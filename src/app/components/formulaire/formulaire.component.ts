import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {faEye, faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ModalComponent} from "../../core/modal/link-preview-modal/modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-formulaire',
    templateUrl: './formulaire.component.html',
    styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
    titleFormControl = new FormControl(
        '',
        [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
        ]
    );
    descriptionFormControl = new FormControl(
        '',
        [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
        ]
    );
    documentsFormControl = new FormControl();
    options: any[] = [
        {value: 'Option 1', label: 'Option 1'},
        {value: 'Option 2', label: 'Option 2'},
    ];
    form!: FormGroup;
    etapes: FormArray = this.formBuilder.array([]);
    faTrash = faTrash;
    faPlus = faPlus;
    faSave = faSave;

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    }

    get formData() {
        return <FormArray>this.form.get('etapes')
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: this.titleFormControl,
            description: this.descriptionFormControl,
            documents: this.documentsFormControl,
            etapes: this.etapes
        });

        this.addStep("Etape 2", "Description 2");
    }

    deleteStep(i: number, count: number) {
        console.log("supprimerEtape", i, count);
        this.etapes.removeAt(i);
    }

    addStep(titleDefault: string = '', descriptionDefault: string = '', documentsDefault: string[] = [], texteDefault: string = '', lienDefault: string = '') {
        console.log("addStep", titleDefault, descriptionDefault, documentsDefault, texteDefault, lienDefault);
        this.etapes.push(this.addNewStep(titleDefault, descriptionDefault, documentsDefault, lienDefault, texteDefault));
    }

    private addNewStep(titleDefault: string, descriptionDefault: string, documentsDefault: string[], lienDefault: string, texteDefault: string) {
        return this.formBuilder.group({
            titre: [
                titleDefault,
                [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
            ],
            description: [descriptionDefault, Validators.required],
            documents: [documentsDefault, Validators.required],
            lien: [
                lienDefault,
                [Validators.required, Validators.minLength(5)]
            ],
            texte: [texteDefault, Validators.required]
        });
    }

    getControl(control: AbstractControl, controlName: string): FormControl | null {
        const formGroup = control as FormGroup;
        const formControl = formGroup.get(controlName);
        return formControl instanceof FormControl ? formControl : null;
    }

    submit() {
        if (this.form.valid) {
            let demarche = this.form.value;
            console.log("demarche", demarche);
        } else {
            console.log("form invalid", this.form);
        }
    }

    hasError(title: string, required: string) {
        return this.getControl(this.form, title)?.hasError(required);

    }
}
