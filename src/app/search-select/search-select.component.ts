import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-select.component.html',
  styleUrl: './search-select.component.scss'
})
export class SearchSelectComponent {
  @Input() results!: any[]
  @Output() search = new EventEmitter();
  @Output() selectedItem = new EventEmitter();

  fb = inject(FormBuilder);

  fillInput:string = '';
  form:FormGroup = this.fb.group({
    searchInput: [""]
  })
  showResults = false;

  selected(item: string) {
    this.selectedItem.emit(item);
    this.fillInput = item;
    this.form.controls['searchInput'].patchValue(item);
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

  buffer!:string;

  @HostListener('keyup',['$event'])
  tabKeyPress(event:any){
    if(event.key == 'Tab' && this.showResults){
      let classArray = Array.from(event.target.classList);
      if(classArray.indexOf('result-item') !== -1){
        this.buffer = event.target.innerHTML;
      }
    }
    
    if(event.key == 'Enter'){
      if(this.buffer){
        this.selected(this.buffer);
      }
    }
  }


  searchStart(event:any){
    this.search.emit(event.target.value);
  }
}
