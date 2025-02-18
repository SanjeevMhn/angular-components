import { Component, inject } from '@angular/core';
import { DynamicWidgetService } from '../dynamic-widget.service';
import { AsyncPipe } from '@angular/common';
import { WidgetComponent } from "./widget/widget.component";

@Component({
  selector: 'app-customizable-dashboard',
  standalone: true,
  imports: [AsyncPipe, WidgetComponent],
  templateUrl: './customizable-dashboard.component.html',
  styleUrl: './customizable-dashboard.component.scss',
})
export class CustomizableDashboardComponent {

  store = inject(DynamicWidgetService);
  toggleEditMode(){
    this.store.editMode = !this.store.editMode
  }
}
