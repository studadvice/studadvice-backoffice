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

    constructor(private dialog: MatDialog,
                public router: Router,
                private dataService: DataService,) {
    }

    ngOnInit() {
        this.getProcedures();
    }

    handleAction(event: { action: string, data: any }) {
        console.log('Action Triggered:', event.action, 'With Row Data:', event.data);
    }

    editAction(item: Procedure) {

    }

    deleteAction(item: Procedure) {

    }

    getProcedures() {
        return this.dataService.getProcedures().subscribe(
            {
                next: (response) => {
                    this.procedures = response;
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }
}