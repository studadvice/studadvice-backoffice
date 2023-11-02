import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
    form: FormGroup = new FormGroup('');
    etapeFormControl = new FormControl();
    descriptionEtapeFormControl = new FormArray([]);


    constructor(private formBuilder: FormBuilder) {
    }

    get etapesControls() {
        return (this.form.get('etapes') as FormArray).controls;
    }

    ngOnInit() {
        this.form = new FormGroup({
            title: this.titleFormControl,
            description: this.descriptionFormControl,
            documents: this.documentsFormControl,
            etapes: this.descriptionEtapeFormControl
        });
        this.ajouterEtape("Etape 1", "Description 1");
        this.ajouterEtape("Etape 2", "Description 2");
    }

    supprimerEtape(i: number) {
        (<FormArray>this.form.controls['etapes']).removeAt(i);
    }

    ajouterEtape(titleDefault: string = '', descriptionDefault: string = '') {
        const etapeFormGroup = this.formBuilder.group({
            title: [titleDefault, Validators.required],
            description: [descriptionDefault, Validators.required]
        });
        (<FormArray>this.form.controls['etapes']).push(etapeFormGroup);
    }
}
