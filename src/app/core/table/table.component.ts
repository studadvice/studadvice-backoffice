import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columnDefinitions: any[] = [];
  @Input() displayColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;

  @Input() actionColumnContent: (row: any) => string = () => '';

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.data);
  }

}
