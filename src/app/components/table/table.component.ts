import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableData } from '../../../types';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() tableData: TableData[] = [];
  @Output() tableOutput: EventEmitter<TableData[]> = new EventEmitter<
    TableData[]
  >();

  ngOnInit() {
    console.log('tableComponent', this.tableData);
    this.tableOutput.emit(this.tableData);
  }
}
