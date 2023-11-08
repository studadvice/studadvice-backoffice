import { Component } from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../core/modal/link-preview-modal/modal.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-forms',
  templateUrl: './category-forms.component.html',
  styleUrls: ['./category-forms.component.css']
})
export class CategoryFormsComponent {

    protected readonly faTrash = faTrash;
    protected readonly faEdit = faEdit;

    constructor(private dialog: MatDialog,
                public router: Router
                ) {
    }

    addCategory() {
        this.router.navigate(['category/add']);
    }
}
