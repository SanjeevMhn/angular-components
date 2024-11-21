import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import {
  ColumnSettings,
  DataTableComponent,
} from '../data-table/data-table.component';
import { SearchColumn } from '../data-table/data-table-header/data-table-header.component';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, DataTableComponent],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
})
export class TablesComponent {
  http = inject(HttpClient);
  pageSize = new BehaviorSubject<number>(5);
  currentPage = new BehaviorSubject<number>(1);
  dataSize = new BehaviorSubject<number>(0);
  searchSubject = new Subject<string>();
  searchText = this.searchSubject.pipe(
    startWith(''),
    debounceTime(800),
    map((text) => text)
  );
  searchColumnSubject = new Subject<SearchColumn>();
  searchColumnData = this.searchColumnSubject.pipe(
    startWith(null),
    debounceTime(800),
    map((search) => search)
  );
  columnSort = new BehaviorSubject<{
    type: 'asc' | 'desc';
    col: string;
  } | null>(null);

  columns: Array<ColumnSettings> = [
    {
      name: 'title',
      searchable: true,
      sortable: true,
      display_order: 1,
    },
    {
      name: 'price',
      searchable: true,
      sortable: true,
      display_order: 3,
    },
    {
      name: 'description',
      searchable: false,
      sortable: false,
      display_order: 5,
    },
    {
      name: 'category',
      searchable: true,
      sortable: true,
      display_order: 4,
    },
    {
      name: 'image',
      searchable: false,
      sortable: false,
      display_order: 2,
    },
  ];

  dataSource$ = combineLatest([
    this.pageSize,
    this.currentPage,
    this.searchText,
    this.searchColumnData,
  ]).pipe(
    switchMap(([pageSize, page, search, colSearch]) => {
      let url = 'https://fakestoreapi.com/products';
      let offset = (page - 1) * pageSize;
      return search.length !== 0
        ? this.http.get<Array<any>>(url).pipe(
            tap((items) =>
              this.dataSize.next(
                items.filter((item) =>
                  item?.title.toLowerCase().includes(search.toLowerCase())
                ).length
              )
            ),
            map((items) =>
              items
                .filter((item) =>
                  item?.title.toLowerCase().includes(search.toLowerCase())
                )
                .splice(offset, offset + pageSize)
            )
          )
        : colSearch !== null
          ? this.http.get<Array<any>>(url).pipe(
              tap((items) =>
                this.dataSize.next(
                  items.filter((item) =>
                    item[colSearch.column]
                      .toString()
                      .toLowerCase()
                      .includes(colSearch.search.toString().toLowerCase())
                  ).length
                )
              ),
              map((items) =>
                items
                  .filter((item) =>
                    item[colSearch.column]
                      .toString()
                      .toLowerCase()
                      .includes(colSearch.search.toString().toLowerCase())
                  )
                  .splice(offset, offset + pageSize)
              )
            )
          : this.http.get<Array<any>>(url).pipe(
              tap((items) => this.dataSize.next(items.length)),
              map((items) => items.slice(offset, offset + pageSize))
            );
    })
  );

  gridEvent(event: any) {
    this.pageSize.next(event.pageSize);
    this.currentPage.next(event.pageIndex + 1);
  }

  searchGrid(event: any) {
    this.searchSubject.next(event);
  }

  sortColumn(event: any) {
    this.columnSort.next(event);
  }

  searchColumn(event: any) {
    this.searchColumnSubject.next(event);
  }
}
