import { Component, inject } from '@angular/core';
import { SearchSelectComponent } from "../search-select/search-select.component";
import { BehaviorSubject, Subject, startWith, debounceTime, map, combineLatest, switchMap, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchSelectComponent, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router = inject(Router);
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

  results$ = combineLatest([this.options$, this.searchText]).pipe(
    switchMap(([options, search]) => {
      return search !== '' ?
        of(options.filter((value: string) => value.toLowerCase().includes(search.toLowerCase()))) :
        of(options)
    })
  )

  dropdownSelectedItem!: any;

  searchResults(keyword: string) {
    this.searchSubject.next(keyword);
  }

  selectedItem(item: string | number) {
    this.dropdownSelectedItem = item;
  }

  logout(){
    this.router.navigate([""]);
  }
}
