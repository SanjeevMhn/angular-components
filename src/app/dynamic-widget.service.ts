import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, of, startWith, Subject, switchMap, tap, withLatestFrom } from 'rxjs';

export type Widget = {
  id: number;
  name: string;
  rows: number;
  cols: number;
  component?: any;
};

@Injectable({
  providedIn: 'root'
})
export class DynamicWidgetService {
  widgets = new BehaviorSubject<Array<Widget>>([
    {
      id: 1,
      name: 'Card One',
      cols: 1,
      rows: 1
    },
    {
      id: 2,
      name: 'Card Two',
      cols: 1,
      rows: 1
    },
    {
      id: 3,
      name: 'Card Three',
      cols: 1,
      rows: 1,
    },
  ]);


  widgets$ = this.widgets.asObservable();
  constructor() {}

  updateWidget(id: number, widget: Partial<Widget>){
    const temp = this.widgets.value;
    let index = temp.findIndex((w: Widget) => w.id == id)
    if(index == -1){
      return 
    }  
    
    const newWidget = [...temp]
    newWidget[index] = {...newWidget[index], ...widget}
    this.widgets.next(newWidget)
  }

  moveWidgets(widgetMoved: Widget, widgetToUpdate: Widget){
    const temp = this.widgets.value;
    let moveIndex = temp.findIndex((w: Widget) => w.id == widgetMoved.id)
    let toUpdateIndex = temp.findIndex((w: Widget) => w.id == widgetToUpdate.id)

    temp[moveIndex] = widgetToUpdate;
    temp[toUpdateIndex] = widgetMoved

    this.widgets.next(temp)
    
  }
}
