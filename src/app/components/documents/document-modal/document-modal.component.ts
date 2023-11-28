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
  title: string = '_ADD_DOCUMENT_';
  documentData: any;

  constructor(private formControlService: FormControlService, private formBuilder: FormBuilder,
              private dataService: DataService, private dialogRef: MatDialogRef<DocumentModalComponent>) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      url: ['', [Validators.required]],
        image: [''],
    });
    this.formControlService.setForm(this.form);

    // get data from dialog
    this.documentData = this.dialogRef._containerInstance._config.data;
    if (this.documentData) {
      this.title = this.documentData.title;
      if (this.documentData.document) {
        this.form.patchValue(this.documentData.document);
      }
    }
  }

  closeDocumentPopup() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid && this.documentData) {
        this.dataService.updateDocument(this.documentData.document.id, this.form.value).subscribe(
            {
                next: (response) => {
                    this.dialogRef.close();
                },
                error: (error) => {
                    console.log(error);
                }
            }
        );
    } else if (this.form.valid) {
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
