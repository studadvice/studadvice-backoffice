import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: any[] = [];
  @Input() columnDefinitions: any[] = [];
  @Input() displayColumns: string[] = [];
  @Output() actionTriggered: EventEmitter<{action: string, data: any}> = new EventEmitter();

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      this.dataSource.data = changes['data'].currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onAction(actionName: string, rowData: any) {
    this.actionTriggered.emit({ action: actionName, data: rowData });
  }

  onEdit(element: any) {
    
  }

  onDelete(element: any) {
    
  }

  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;
}
