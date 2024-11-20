import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnSettings } from '../data-table.component';

@Component({
  selector: 'app-data-table-header',
  standalone: true,
  imports: [],
  templateUrl: './data-table-header.component.html',
  styleUrl: './data-table-header.component.scss',
})
export class DataTableHeaderComponent {
  @Input() column!: ColumnSettings;
  @Output() sortColumn = new EventEmitter();

  sortType: 'asc' | 'desc' = 'asc';

  columnSort(event: any) {
    if (this.column.sortable) {
      this.sortType =
        this.sortType == null ? 'asc' : this.sortType == 'asc' ? 'desc' : 'asc';
      let sort = {
        type: this.sortType,
        col: this.column.name,
      };
      this.sortColumn.emit(sort);
    }
  }
}
