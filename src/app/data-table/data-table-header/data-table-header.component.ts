import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-table-header',
  standalone: true,
  imports: [],
  templateUrl: './data-table-header.component.html',
  styleUrl: './data-table-header.component.scss'
})
export class DataTableHeaderComponent {

  @Input() headerText!:any;
  @Output() sortColumn = new EventEmitter();

  sortType: 'asc' | 'desc' = 'asc';

  columnSort(event:any){
    this.sortType = this.sortType == null ? 'asc' : this.sortType == 'asc' ? 'desc' : 'asc';
    let sort = {
      type: this.sortType,
      col: this.headerText
    }
    this.sortColumn.emit(sort);
  }
}
