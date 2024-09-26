import { Component } from '@angular/core';
import { DataTableComponent } from "../data-table/data-table.component";
import { SearchSelectComponent } from "../search-select/search-select.component";
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataTableComponent, SearchSelectComponent, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  results$:Observable<Array<any>> = of([
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Biratnagar",
    "Pokhara",
    "Chitwan",
    "Birgunj",
    "Palpa",
    "Jhapa",
    "Nepalgunj",
    "Mustang"
  ])

  searchResults(keyword: string){

  }
  
  selectedItem(item: string | number){

  }
}
