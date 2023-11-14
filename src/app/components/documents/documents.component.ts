import {Component} from '@angular/core';
import {faEdit} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
    form: any;
    title?: string = '';
    protected readonly faEdit = faEdit;
    documents: any[] = [];

    submit() {

    }

    hasError(title: string, required: string) {

    }

    getFormControl(name: string) {

    }

    editAction(document: any) {

    }
}
