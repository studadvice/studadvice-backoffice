import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['name', 'color', 'category', 'price', 'action'];
    dataSource = new MatTableDataSource<Demarche>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit() {
        // Initialize your data source here
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}

// Replace this with your actual data model
export interface Demarche {
    id: number;
    name: string;
    color: string;
    category: string;
    price: number;
}

// Replace this with your actual data
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