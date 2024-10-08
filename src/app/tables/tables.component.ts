import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { DataTableComponent } from "../data-table/data-table.component";

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, DataTableComponent],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent {
  http = inject(HttpClient);
  pageSize = new BehaviorSubject<number>(5);
  currentPage = new BehaviorSubject<number>(1);
  searchSubject = new Subject<string>();
  searchText = this.searchSubject.pipe(
    startWith(""),
    debounceTime(800),
    map(text => text)
  )
  dataSource$ = combineLatest(
    [this.pageSize, this.currentPage, this.searchText]).pipe(
      switchMap(([pageSize, page, search]) => {
        let url = 'https://fakestoreapi.com/products';
        let offset = (page - 1) * pageSize;
        return search.length !== 0 ?
          this.http.get<Array<any>>(url).pipe(
            map(items => items.filter(item => item?.title.toLowerCase().includes(search.toLowerCase())))
          ) : this.http.get<Array<any>>(url).pipe(
            map((items => items.slice(offset, offset + pageSize)))
          )
      })
    )

  gridEvent(event: any) {
    this.pageSize.next(event.pageSize);
    this.currentPage.next(event.pageIndex + 1)
  }

  searchGrid(event: any) {
    this.searchSubject.next(event);
  }

}
