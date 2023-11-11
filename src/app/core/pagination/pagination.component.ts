import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
    @Input() totalItems!: number;
    @Input() itemsPerPage!: number;
    @Output() pageChanged = new EventEmitter<number>();

    currentPage: number = 1;

    constructor() {
    }

    getTotalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    selectPage(page: number): void {
        if (page < 1 || page > this.getTotalPages()) return;
        this.currentPage = page;
        this.pageChanged.emit(this.currentPage);
    }

    getPages(): Array<number> {
        const totalPages = this.getTotalPages();
        const pages: number[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }
}
