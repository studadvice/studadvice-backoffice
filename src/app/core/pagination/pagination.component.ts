import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
    @Input() totalItems!: number;
    @Input() itemsPerPage!: number;
    @Output() pageChanged = new EventEmitter<number>();
    @Input() currentPage: number = 1;
    @Input() totalPages: number;

    constructor() {
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    }

    ngOnChanges() {
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    }

    selectPage(page: number): void {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        console.log("Current page: " + this.currentPage, page);
        this.pageChanged.emit(this.currentPage - 1);
    }

    getPages(): Array<number> {
        const pages: number[] = [];
        for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
        }
        console.log(pages);
        return pages;
    }
}
