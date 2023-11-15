import {Component} from '@angular/core';
import {FormControlService} from "../../../shared/services/form-control.service";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../../../shared/dataservices/data.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.css']
})
export class DocumentModalComponent {
  form: any;
  protected readonly faSave = faSave;

  constructor(private formControlService: FormControlService, private formBuilder: FormBuilder,
              private dataService: DataService, private dialogRef: MatDialogRef<DocumentModalComponent>) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      link: ['', [Validators.required]],
    });
    this.formControlService.setForm(this.form);
  }

  closeDocumentPopup() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.dataService.addDocument(this.form.value).subscribe(
        {
          next: (response) => {
            this.dialogRef.close();
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
    }
  }

  getFormControl(name: string) {
    return this.formControlService.getFormControl(name);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.formControlService.hasError(controlName, errorName);
  }

}
