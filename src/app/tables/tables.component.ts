import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
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
  dataSource$ = combineLatest(
    [this.pageSize,this.currentPage]).pipe(
    switchMap(([pageSize,page]) => {
      let url = 'https://fakestoreapi.com/products';
      let offset = (page - 1 ) * pageSize;
      return this.http.get<Array<any>>(`${url}`).pipe(
        map((items => items.slice(offset, offset + pageSize)))
      )
    })
  )

  gridEvent(event: any){
    this.pageSize.next(event.pageSize);
    this.currentPage.next(event.pageIndex + 1)
  }

}
