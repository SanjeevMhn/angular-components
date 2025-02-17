import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

export type Widget = {
  id: number;
  name: string;
  rows?: number;
  cols?: number;
  component?: any;
};

@Injectable()
export class DynamicWidgetService {
  widgets = new BehaviorSubject<Array<Widget>>([
    {
      id: 1,
      name: 'Card',
      cols: 4,
      rows: 1
    },
    {
      id: 2,
      name: 'Card',
      cols: 2,
      rows: 1
    },
    {
      id: 3,
      name: 'Card',
    },
  ]);

  widgets$ = this.widgets.asObservable()
  constructor() {}

  updateWidget(id: number, widget: Partial<Widget>){
    let temp = this.widgets.getValue();
    let index = temp.findIndex((w: Widget) => w.id == id)
    if(index == -1){
      return 
    }  
    
    let newWidget = [...temp]
    newWidget[index] = {...newWidget[index], ...widget}
    this.widgets.next(newWidget)
  }
}
