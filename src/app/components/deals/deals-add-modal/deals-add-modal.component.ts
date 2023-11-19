import {Component} from '@angular/core';
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder} from "@angular/forms";
import {FormControlService} from "../../../shared/services/form-control.service";

@Component({
  selector: 'app-deals-add-modal',
  templateUrl: './deals-add-modal.component.html',
  styleUrls: ['./deals-add-modal.component.css']
})
export class DealsAddModalComponent {
    title: string = '_ADD_DEAL_TITLE_'
    protected readonly faSave = faSave;
    form: any;

    constructor(private formControlService: FormControlService, private formBuilder: FormBuilder){
        this.form = this.formBuilder.group({
            name: [''],
            description: [''],
            image: [''],
            start_date: [''],
            end_date: [''],
            status: [''],
        });
        this.formControlService.setForm(this.form);
    }
    
    closeDocumentPopup() {

    }

    hasError(name: string, required: string) {

    }

    getFormControl(name: string) {
        return this.formControlService.getFormControl(name);
    }

    saveDeal() {
        
    }
}
