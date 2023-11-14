import { Component } from '@angular/core';
import {FormControlService} from "../../../shared/services/form-control.service";
import {faSave} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.css']
})
export class DocumentModalComponent {
  form: any;


  constructor(private formControlService: FormControlService) {
  }

  closeDocumentPopup() {

  }

  submit() {

  }

  getFormControl(name: string) {
    return this.formControlService.getFormControl(name);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.formControlService.hasError(controlName, errorName);
  }

  protected readonly faSave = faSave;
}
