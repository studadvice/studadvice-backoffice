import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
    @Input() totalItems!: number;
    @Input() itemsPerPage!: number;
    @Output() pageChanged = new EventEmitter<number>();
    @Input() currentPage: number = 0;
    @Input() totalPages: number;

    constructor() {
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    }

    ngOnInit(): void {
        this.selectPage(this.currentPage);
    }

    ngOnChanges() {
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    }

    selectPage(page: number): void {
        if (page < 0 || page > this.totalPages) return;
        this.currentPage = page;
        this.pageChanged.emit(this.currentPage);
    }

    getPages(): Array<number> {
        const pages: number[] = [];
        for (let i = 0; i < this.totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }
}
