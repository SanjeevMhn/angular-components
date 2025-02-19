import { Component, HostListener, inject } from '@angular/core';
import { DynamicWidgetService, Widget } from '../dynamic-widget.service';
import { AsyncPipe } from '@angular/common';
import { WidgetComponent } from './widget/widget.component';

@Component({
  selector: 'app-customizable-dashboard',
  standalone: true,
  imports: [AsyncPipe, WidgetComponent],
  templateUrl: './customizable-dashboard.component.html',
  styleUrl: './customizable-dashboard.component.scss',
})
export class CustomizableDashboardComponent {
  store = inject(DynamicWidgetService);
  toggleEditMode() {
    this.store.editMode = !this.store.editMode;
  }

  showWidgetList = false;
  toggleWidgetList() {
    this.showWidgetList = !this.showWidgetList;
  }

  updateWidgetVisibility(event: any, widget: Widget) {
    event.stopPropagation();
    this.store.updateWidget(widget.id, { show: !widget.show });
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      if (this.showWidgetList) {
        this.showWidgetList = false;
      }
    }
  }
}
