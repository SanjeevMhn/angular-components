import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, delay, map } from 'rxjs';
import { DataTableComponent } from "../../data-table/data-table.component";

@Component({
  selector: 'app-popular-product-table',
  standalone: true,
  imports: [AsyncPipe, DataTableComponent],
  template: `
        @if(popularProducts$ | async; as products){
            <app-data-table 
             [pageSize]="5"
             [dataSize]="products.length"
             [data]="products"
             [columns]="popularProductColumns"
             [title]="'Popular Products'"
             class="d-contents"
            ></app-data-table>
        }@else{
            <div class="loading-table"></div>
        }
  `,
  styles: `
  :host{
    height: 100%;
    width: 100%;
  }
  `
})
export class PopularProductTableComponent {
  popularProducts$ = new BehaviorSubject<Array<{
    id: number,
    name: string,
    category: string,
    sales: number
  }>>([
    {
      id: 1,
      name: 'Women\'s Jacket',
      category: 'clothes',
      sales: 200
    },
    {
      id: 2,
      name: 'Hoodie',
      category: 'clothes',
      sales: 120
    },
    {
      id: 3,
      name: 'Women\'s Necklace',
      category: 'jewelary',
      sales: 100
    },
    {
      id: 4,
      name: 'Joggers',
      category: 'clothes',
      sales: 100
    },
  ]).pipe(
    delay(3000),
    map(items => items)
  )

  popularProductColumns: Array<any> = [
    {
      name: 'name',
      sortable: true,
      searchable: true,
      display_order: 1
    },
    {
      name: 'category',
      sortable: true,
      searchable: true,
      display_order: 2,
    },
    {
      name: 'sales',
      sortable: true,
      searchable: true,
      display_order: 3
    }
  ]
}
