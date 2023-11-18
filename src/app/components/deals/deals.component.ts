import {Component, OnInit} from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Deal} from "../../core/data/demarche";

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

    constructor() {
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

    }
}
