import {Component, OnInit, ViewChild} from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
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
    totalItems: number = 100;
    itemsPerPage: number = 2;
    currentPage: number = 1;
    protected readonly faTrash = faTrash;

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
        this.dialog.open(DocumentModalComponent, {
            data: {
                document: document,
                title: '_EDIT_DOCUMENT_'
            }
        });

        this.dialog.afterAllClosed.subscribe(() => {
            this.getDocuments();
        });
    }

    addDocuments() {
        this.dialog.open(DocumentModalComponent, {});

        this.dialog.afterAllClosed.subscribe(() => {
            this.getDocuments();
            this.addDocumentButton.enable();
        });
    }

    pageChanged(event: any): void {
        this.currentPage = event;
        this.getDocuments(event);
    }

    private getDocuments(page: number = 0) {
        this.dataService.getDocuments(page, this.itemsPerPage).subscribe(
            {
                next: (response) => {
                    this.documents = response.content;
                    this.totalItems = response.totalElements;
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    deleteAction(document: any) {
        this.dataService.deleteDocument(document.id).subscribe(
            {
                next: (response) => {
                    this.getDocuments();
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }
}
