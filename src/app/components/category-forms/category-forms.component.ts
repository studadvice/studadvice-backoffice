import {Component, OnInit} from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../core/modal/link-preview-modal/modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../shared/dataservices/data.service";
import {Category} from "../../core/data/demarche";

@Component({
  selector: 'app-category-forms',
  templateUrl: './category-forms.component.html',
  styleUrls: ['./category-forms.component.css']
})
export class CategoryFormsComponent implements OnInit {

    protected readonly faTrash = faTrash;
    protected readonly faEdit = faEdit;
    categories: Category[] = [];


    constructor(private dialog: MatDialog,
                public router: Router,
                private dataService: DataService,
                ) {
    }

    ngOnInit(): void {
        this.getCategory();
    }

    addCategory() {
        this.router.navigate(['category/add']);
    }

    getCategory() {
        return this.dataService.getCategories().subscribe((response) => {
            this.categories = response;
        });
    }


}
