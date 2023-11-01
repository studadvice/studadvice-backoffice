import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-formulaire',
    templateUrl: './formulaire.component.html',
    styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
    formControl = new FormControl();
    options: any[] = [
        {label: 'Option 1', value: '1'},
        {label: 'Option 2', value: '2'},
        {label: 'Option 3', value: '3'},
        {label: 'Option 4', value: '4'},
    ];

}
