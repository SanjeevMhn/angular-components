import { Component, inject, Injectable, Type } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap,
  toArray,
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
import { PieChartComponent } from './customizable-dashboard/pie-chart/pie-chart.component';
import { PopularProductTableComponent } from './customizable-dashboard/popular-product-table/popular-product-table.component';

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
      name: 'Product Card',
      cols: 1,
      rows: 1,
      show: true,
      component: ProductsCardComponent,
    },
    {
      id: 2,
      name: 'Orders Card',
      cols: 1,
      rows: 1,
      show: true,
      component: OrdersCardComponent,
    },
    {
      id: 6,
      name: 'Pie Chart',
      cols: 2,
      rows: 3,
      show: true,
      component: PieChartComponent,
    },
    {
      id: 3,
      name: 'Members Card',
      cols: 1,
      rows: 1,
      show: true,
      component: MembersCardComponent,
    },
    {
      id: 4,
      name: 'Delivered Card',
      cols: 1,
      rows: 1,
      show: true,
      component: DeliveredCardComponent,
    },
    {
      id: 5,
      name: 'Line Chart',
      cols: 2,
      rows: 2,
      show: true,
      component: LineChartComponent,
    },

    {
      id: 7,
      name: 'Product Table',
      cols: 2,
      rows: 3,
      show: true,
      component: TablesComponent,
    },
    {
      id: 8,
      name: 'Popular Products Table',
      cols: 2,
      rows: 2,
      show: true,
      component: PopularProductTableComponent,
    },
  ]);

  widgets$ = this.widgets.asObservable();
  visibleWidgets$ = this.widgets$.pipe(
    map(widgets => widgets.filter(widget => widget.show)),
  )
  draggedItemComp: Component | null = null;
  constructor() { }

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
