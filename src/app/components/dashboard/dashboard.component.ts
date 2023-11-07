import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    displayedColumns: string[] = ['name', 'color', 'category', 'price', 'actions'];
    dataSource = ELEMENT_DATA;
    columnDefinitions: any[] = [
        {field: 'name', header: 'Name'},
        {field: 'color', header: 'Color'},
        {field: 'category', header: 'Category'},
        {field: 'price', header: 'Price'},
    ];

    ngOnInit() {
        // Initialize your data source here
    }

    handleAction(event: { action: string, data: any }) {
        console.log('Action Triggered:', event.action, 'With Row Data:', event.data);
    }

    editAction(item: Demarche) {
        
    }

    deleteAction(item: Demarche) {
        
    }
}

export interface Demarche {
    id: number;
    name: string;
    color: string;
    category: string;
    price: number;
}

const ELEMENT_DATA: Demarche[] = [
    {id: 1, name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: 2999},
    {id: 2, name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: 1999},
    {id: 3, name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: 99},
    {id: 4, name: 'Apple Watch', color: 'Black', category: 'Watches', price: 199},
    {id: 5, name: 'Apple iMac', color: 'Silver', category: 'PC', price: 2999},
    {id: 6, name: 'Apple AirPods', color: 'White', category: 'Accessories', price: 399},
    {id: 7, name: 'iPad Pro', color: 'Gold', category: 'Tablet', price: 699},
    {id: 8, name: 'Magic Keyboard', color: 'Black', category: 'Accessories', price: 99}
];