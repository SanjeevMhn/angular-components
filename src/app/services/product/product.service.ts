import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  products: any

  http = inject(HttpClient)
  constructor() { }

  getProducts():Observable<Array<any>>{
    let url = 'https://fakestoreapi.com/products';
    return this.products ? of(this.products) : this.http.get<Array<any>>(url).pipe(
      tap(data => {
        this.products = data
      })
    );
  }
}
