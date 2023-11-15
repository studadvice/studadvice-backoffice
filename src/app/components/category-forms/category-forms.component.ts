import {Component, OnInit} from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DataService} from "../../shared/dataservices/data.service";
import {Category} from "../../core/data/demarche";
import {CategoryFormsModalComponent} from "./category-forms-modal/category-forms-modal.component";

@Component({
    selector: 'app-category-forms',
    templateUrl: './category-forms.component.html',
    styleUrls: ['./category-forms.component.css']
})
export class CategoryFormsComponent implements OnInit {

    categories: Category[] = [];
    protected readonly faTrash = faTrash;
    protected readonly faEdit = faEdit;

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

    deleteCategory(category: Category) {
        this.categories = this.categories.filter((c) => c.id !== category.id);
    }

    editCategory(category: Category) {
        this.dialog.open(CategoryFormsModalComponent, {
            width: '500px',
            data: {
                category: category
            }
        });

        this.dialog.afterAllClosed.subscribe(() => {
            this.getCategory();
        });
    }
}
