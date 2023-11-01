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
        {value: 'Option 1', label: 'Option 1'},
        {value: 'Option 2', label: 'Option 2'},
        {value: 'Option 3', label: 'Option 3'},
        {value: 'Option 4', label: 'Option 4'},
        {value: 'Option 5', label: 'Option 5'},
    ];

}
