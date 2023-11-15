import {Component, OnInit} from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Procedure} from "../../core/data/demarche";
import {DataService} from "../../shared/dataservices/data.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    protected readonly faTrash = faTrash;
    protected readonly faEdit = faEdit;
    procedures: Procedure[] = [];
    totalItems: number = 100;
    itemsPerPage: number = 2;
    editProcedure: boolean = false;
    procedure?: Procedure;
    currentPage: number = 1;

    constructor(public router: Router,
                private dataService: DataService,) {
    }

    ngOnInit() {
        this.getProcedures(this.currentPage);
    }

    handleAction(event: { action: string, data: any }) {
        console.log('Action Triggered:', event.action, 'With Row Data:', event.data);
    }

    onProcedureChange(event: {editProcedure: boolean, procedure: Procedure}) {
        this.editProcedure = event.editProcedure;
        this.procedure = event.procedure;
    }

    editAction(procedure: Procedure) {
        console.log('Edit Action Triggered:', procedure);
        this.procedure = procedure;
        this.editProcedure = true;
    }

    deleteAction(item: Procedure) {
        console.log('Delete Action Triggered:', item);
        this.dataService.deleteProcedure(item.id).subscribe(
            {
                next: (response) => {
                    this.getProcedures(this.currentPage);
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    getProcedures(page: number) {
        this.dataService.getProcedures(page, this.itemsPerPage).subscribe(
            {
                next: (response) => {
                    this.procedures = response.procedures;
                    this.totalItems = response.total;
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }


    pageChanged(event: any): void {
        console.log('Page changed to:', event);
        this.currentPage = event;
        this.getProcedures(this.currentPage);
    }
}