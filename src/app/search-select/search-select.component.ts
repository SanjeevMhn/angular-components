import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-select',
  standalone: true,
  imports: [],
  templateUrl: './search-select.component.html',
  styleUrl: './search-select.component.scss'
})
export class SearchSelectComponent {
  @Input() results!: any[]
  @Output() search = new EventEmitter();
  @Output() selectedItem = new EventEmitter();

  fillInput!:string | number;

  showResults = false;

  selected(item: string | number) {
    this.selectedItem.emit(item);
    this.fillInput = item;
    this.showResults = false;
  }

  toggleShowResult(state: boolean) {
    this.showResults = state
  }

  @HostListener('click', ['$event.target'])
  clickOutside(event: any) {
    let classArray = Array.from(event.classList);
    if (classArray.indexOf('search-input') == -1 &&
      classArray.indexOf('result-item') == -1) {
      this.showResults = false;
    }
  }

  searchStart(event:any){
    this.search.emit(event.target.value);
  }
}
