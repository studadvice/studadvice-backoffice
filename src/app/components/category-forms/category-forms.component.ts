import {Component, OnInit} from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DataService} from "../../shared/dataservices/data.service";
import {Category, Process} from "../../core/data/demarche";
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
    totalItems: number = 100;
    itemsPerPage: number = 10;
    currentPage: number = 0;

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

    getCategory(page: number = 0) {
        this.dataService.getCategories(page, this.itemsPerPage).subscribe(
            {
                next: (response) => {
                    this.categories = response.content;
                    this.totalItems = response.totalElements;
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    deleteCategory(category: Category) {
        this.dataService.deleteCategory(category.id).subscribe(
            {
                next: (response) => {
                    this.getCategory(this.currentPage);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    editCategory(category: Category) {
        this.dialog.open(CategoryFormsModalComponent, {
            data: {
                category: category
            }
        });

        this.dialog.afterAllClosed.subscribe(() => {
            this.getCategory();
        });
    }

    pageChanged(event: any): void {
        this.currentPage = event;
        this.getCategory(event);
    }
}
