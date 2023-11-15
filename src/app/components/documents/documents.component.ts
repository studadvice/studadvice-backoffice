import {Component, OnInit, ViewChild} from '@angular/core';
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {DocumentModalComponent} from "./document-modal/document-modal.component";
import {ButtonComponent} from "../../core/input/button/button.component";
import {DataService} from "../../shared/dataservices/data.service";

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
    form: any;
    title?: string = '';
    protected readonly faEdit = faEdit;
    documents: any[] = [];
    @ViewChild('addDocumentButton', {static: false}) addDocumentButton!: ButtonComponent;

    constructor(public dialog: MatDialog, private dataService: DataService) {
    }

    ngOnInit(): void {
        this.getDocuments();
    }

    submit() {

    }

    hasError(title: string, required: string) {

    }

    getFormControl(name: string) {

    }

    editAction(document: any) {

    }

    addDocuments() {
        this.dialog.open(DocumentModalComponent, {
        });

        this.dialog.afterAllClosed.subscribe(() => {
            this.getDocuments();
            // enable add button
            this.addDocumentButton.enable();
        });
    }

    private getDocuments() {
        this.dataService.getDocuments().subscribe(
            {
                next: (response) => {
                    this.documents = response;
                },
                error: (error) => {
                    console.log(error);
                }
            }
        );
    }
}
