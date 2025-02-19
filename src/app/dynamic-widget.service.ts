import { Component, inject, Injectable, Type } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { TablesComponent } from './tables/tables.component';
import {
  DataCardComponent,
  DataCardType,
} from './data-card/data-card.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductsCardComponent } from './customizable-dashboard/products-card/products-card.component';
import { OrdersCardComponent } from './customizable-dashboard/orders-card/orders-card.component';
import { MembersCardComponent } from './customizable-dashboard/members-card/members-card.component';
import { DeliveredCardComponent } from './customizable-dashboard/delivered-card/delivered-card.component';
import { LineChartComponent } from './customizable-dashboard/line-chart/line-chart.component';

export type Widget = {
  id: number;
  name: string;
  rows: number;
  cols: number;
  show: boolean;
  component: any | null;
};

@Injectable({
  providedIn: 'root',
})
export class DynamicWidgetService {
  sanitizer = inject(DomSanitizer);
  editMode = false;
  widgets = new BehaviorSubject<Array<Widget>>([
    {
      id: 1,
      name: 'Card One',
      cols: 1,
      rows: 1,
      show: true,
      component: ProductsCardComponent,
    },
    {
      id: 2,
      name: 'Card Two',
      cols: 1,
      rows: 1,
      show: true,
      component: OrdersCardComponent,
    },
    {
      id: 3,
      name: 'Card Three',
      cols: 1,
      rows: 1,
      show: true,
      component: MembersCardComponent,
    },
    {
      id: 4,
      name: 'Card Four',
      cols: 1,
      rows: 1,
      show: true,
      component: DeliveredCardComponent,
    },
    {
      id: 5,
      name: 'Table',
      cols: 3,
      rows: 3,
      show: true,
      component: TablesComponent,
    },
    {
      id: 6,
      name: 'Line Chart',
      cols: 3,
      rows: 3,
      show: true,
      component: LineChartComponent,
    },
  ]);

  widgets$ = this.widgets.asObservable();
  draggedItemComp: Component | null = null;
  constructor() {}

  updateWidget(id: number, widget: Partial<Widget>) {
    const temp = this.widgets.value;
    let index = temp.findIndex((w: Widget) => w.id == id);
    if (index == -1) {
      return;
    }

    const newWidget = [...temp];
    newWidget[index] = { ...newWidget[index], ...widget };
    this.widgets.next(newWidget);
  }

  moveWidgets(widgetMoved: Widget, widgetToUpdate: Widget) {
    const temp = this.widgets.value;
    let moveIndex = temp.findIndex((w: Widget) => w.id == widgetMoved.id);
    let toUpdateIndex = temp.findIndex(
      (w: Widget) => w.id == widgetToUpdate.id
    );

    temp[moveIndex] = widgetToUpdate;
    temp[toUpdateIndex] = widgetMoved;

    this.widgets.next(temp);
  }
}
