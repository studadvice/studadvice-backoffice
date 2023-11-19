import {Component, OnInit} from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Deal} from "../../core/data/demarche";
import {MatDialog} from "@angular/material/dialog";
import {DealsAddModalComponent} from "./deals-add-modal/deals-add-modal.component";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

    protected readonly faEdit = faEdit;
    protected readonly faTrash = faTrash;
    totalItems: any;
    itemsPerPage: any;
    currentPage: any;
    deals: Deal[] = [];

    constructor(private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    pageChanged($event: number) {

    }

    editDeal(deal: any) {

    }

    deleteDeal(deal: any) {

    }

    addDeal() {
        this.dialog.open(DealsAddModalComponent, {
            data: {}
        });

        this.dialog.afterAllClosed.subscribe(() => {
            console.log('The dialog was closed');
        });
    }
}
