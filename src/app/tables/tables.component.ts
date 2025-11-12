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
import { ProductService } from '../services/product/product.service';

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
  searchColumnSubject = new BehaviorSubject<Array<SearchColumn>>([]);

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

  productService = inject(ProductService);

  dataSource$ = combineLatest([
    this.pageSize,
    this.currentPage,
    this.searchText,
    this.searchColumnSubject,
  ]).pipe(
    switchMap(([pageSize, page, search, colSearch]) => {
      let offset = (page - 1) * pageSize;
      return search.length !== 0
        ? this.productService.getProducts().pipe(
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
        : colSearch.length > 0
        ? this.productService.getProducts().pipe(
            tap((items) => {
              let filteredItems = this.searchDataByColumn(items, colSearch);
              this.dataSize.next(filteredItems.length);
            }),
            map((items) =>
              this.searchDataByColumn(items, colSearch)
            )
          )
        : this.productService.getProducts().pipe(
            tap((items) => this.dataSize.next(items.length)),
            map((items) => items.slice(offset, offset + pageSize))
          );
    })
  );

  filtered: Array<any> = [];

  searchDataByColumn(
    items: Array<any>,
    colSearch: Array<SearchColumn>
  ): Array<any> {
    if (this.filtered.length == 0) {
      colSearch.forEach((col) => {
        this.filtered = items.filter((item) => {
          if (
            item[col.column]
              .toString()
              .toLowerCase()
              .includes(col.search.toString().toLowerCase())
          ) {
            return item;
          }
        });
      });
    } else if (this.filtered.length > 0) {
      colSearch.forEach((col) => {
        this.filtered = this.filtered.filter((item) => {
          if (
            item[col.column]
              .toString()
              .toLowerCase()
              .includes(col.search.toString().toLowerCase())
          ) {
            return item;
          }
        });
      });
    }

    return this.filtered;
  }

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
    let searchItems: Array<SearchColumn> = [];
    searchItems = this.searchColumnSubject.getValue();
    searchItems = searchItems.filter((item) => item.column !== event.column);
    searchItems.push(event);
    searchItems = searchItems.filter((item) => item.search !== '');
    if (searchItems.length == 0) {
      this.filtered = [];
    }
    this.searchColumnSubject.next(searchItems);
  }
}
