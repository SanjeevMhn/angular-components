import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataTableHeaderComponent } from './data-table-header/data-table-header.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [KeyValuePipe, JsonPipe, MatPaginator, DataTableHeaderComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  @Input() data!: Array<any>;
  @Input() title!: string;
  @Input() pageSize!: number | null;
  @Input() dataSize!: number | null;

  @Output() gridEvent = new EventEmitter();
  @Output() searchGridEvent = new EventEmitter();
  @Output() sortColumn = new EventEmitter();

  zero(): number {
    return 0;
  }

  checkIfImage(obj: any): boolean {
    const regex = /\b(?:img|image|picture|photo|icon)\b/;
    return regex.test(obj);
  }

  handlePageEvent(event: any) {
    this.gridEvent.emit(event);
  }

  searchGrid(event: any) {
    this.searchGridEvent.emit(event.target.value);
  }

  onColumnSort(event: any) {
    this.data =
      event.type == 'asc'
        ? this.data.sort((a: any, b: any) =>
            typeof a[`${event.col}`] !== 'number'
              ? a[`${event.col}`]
                  .toLowerCase()
                  .localeCompare(b[`${event.col}`].toLowerCase())
              : a[`${event.col}`] - b[`${event.col}`]
          )
        : this.data.sort((a: any, b: any) =>
            typeof b[`${event.col}`] !== 'number'
              ? b[`${event.col}`]
                  .toLowerCase()
                  .localeCompare(a[`${event.col}`].toLowerCase())
              : b[`${event.col}`] - a[`${event.col}`]
          );
  }
}
