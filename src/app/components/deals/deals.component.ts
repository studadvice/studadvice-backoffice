import { Component } from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent {

    protected readonly faEdit = faEdit;
    protected readonly faTrash = faTrash;
    totalItems: any;
    itemsPerPage: any;
    currentPage: any;
    deals: any;

    pageChanged($event: number) {

    }

    editDeal(deal: any) {

    }

    deleteDeal(deal: any) {

    }

    addDeal() {

    }
}
