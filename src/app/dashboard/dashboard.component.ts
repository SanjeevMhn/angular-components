import { Component } from '@angular/core';
import { DataTableComponent } from "../data-table/data-table.component";
import { SearchSelectComponent } from "../search-select/search-select.component";
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataTableComponent, SearchSelectComponent, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  options$ = new BehaviorSubject<Array<string>>([
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

  searchSubject = new Subject<string>();
  searchText = this.searchSubject.pipe(
    startWith(""),
    debounceTime(600),
    map(search => search)
  )

  results$ = combineLatest([this.options$,this.searchText]).pipe(
    switchMap(([options,search]) => {
      return search !== '' ? 
        of(options.filter((value:string) => value.toLowerCase().includes(search.toLowerCase()))) : 
        of(options)
    })
  )

  dropdownSelectedItem!:any;

  searchResults(keyword: string){
    this.searchSubject.next(keyword);
  }
  
  selectedItem(item: string | number){
    this.dropdownSelectedItem = item;
  }
}
