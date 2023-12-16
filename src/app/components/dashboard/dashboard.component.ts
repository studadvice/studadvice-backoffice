import {Component, OnInit} from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Process} from "../../core/data/demarche";
import {DataService} from "../../shared/dataservices/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    protected readonly faTrash = faTrash;
    protected readonly faEdit = faEdit;
    processes: Process[] = [];
    totalItems: number = 0;
    itemsPerPage: number = 2;
    editProcess: boolean = false;
    process?: Process;
    totalPages: number = 0;
    currentPage: number = 0;

    constructor(public router: Router,
                private dataService: DataService,) {
    }

    ngOnInit() {
        this.pageChanged(0)
    }

    handleAction(event: { action: string, data: any }) {
        console.log('Action Triggered:', event.action, 'With Row Data:', event.data);
    }

    onProcessChange(event: any) {
        console.log("this.process", this.process);
        this.editProcess = event.editProcess;
        this.process = event.process;
    }

    editAction(process: Process) {
        this.process = process;
        this.editProcess = true;
    }

    deleteAction(item: Process) {
        this.dataService.deleteProcess(item.id).subscribe(
            {
                next: (response) => {
                    this.getProcess(this.currentPage);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    getProcess(page: number) {
        this.dataService.getProcess(page, this.itemsPerPage).subscribe(
            {
                next: (response) => {
                    this.processes = response.content;
                    this.totalItems = response.totalElements;
                    this.totalPages = response.totalPages;
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    pageChanged(event: any): void {
        this.currentPage = event;
        this.getProcess(this.currentPage);
    }
}