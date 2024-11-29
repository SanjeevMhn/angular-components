import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ColumnSettings } from '../data-table.component';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

export type SearchColumn = {
  column: string;
  search: string | number;
};

@Component({
  selector: 'app-data-table-header',
  standalone: true,
  imports: [],
  templateUrl: './data-table-header.component.html',
  styleUrl: './data-table-header.component.scss',
})
export class DataTableHeaderComponent implements OnDestroy {
  @Input() column!: ColumnSettings;
  @Output() sortColumn = new EventEmitter();
  @Output() columnSearch = new EventEmitter();

  destroy$ = new Subject<void>();
  searchColumnSubject = new Subject<SearchColumn>();
  sortType: 'asc' | 'desc' = 'asc';
  searches: Array<{
    column: string;
    search: string | number;
  }> = [];

  constructor(){
    this.searchColumnSubject.pipe(
      debounceTime(900),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(search => {
      this.columnSearch.emit(search);
    })
  }

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

  searchColumn(event: any, column: ColumnSettings) {
    // if (event.target.value !== '') {
      let searches = this.searchColumnSubject.next({
        column: column.name,
        search: event.target.value
      });
    // }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
