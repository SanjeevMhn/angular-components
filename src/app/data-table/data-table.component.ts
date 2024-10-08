import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [KeyValuePipe, JsonPipe, MatPaginator],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {

  @Input() data!: any;

  @Output() gridEvent = new EventEmitter();
  @Output() searchGridEvent = new EventEmitter();

  zero(): number {
    return 0;
  }

  checkIfImage(obj: any): boolean {
    const regex = /\b(?:img|image|picture|photo|icon)\b/;
    return regex.test(obj);
  }

  handlePageEvent(event: any){
    this.gridEvent.emit(event)
  }

  searchGrid(event:any){
    this.searchGridEvent.emit(event.target.value);
  }

}
