import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

export type DataCardType = {
  icon: SafeHtml | null;
  name: string;
  data: number;
}

@Component({
  selector: 'app-data-card',
  standalone: true,
  imports: [],
  template: `
    @if(_card){
    <div class="data-card">
      @if(_card.icon !== null){
      <div class="card-icon">
        <div class="card-icon-container" [innerHTML]="_card.icon"></div>
      </div>
      }
      <div class="title">{{ _card.name }}</div>
      <div class="data">{{ _card.data }}</div>
      <a href="javascript:void(0)" class="show-more">View Details</a>
    </div>
    }
  `,
  styles: ``,
})
export class DataCardComponent {
  _card!: DataCardType
  @Input() set data(data: DataCardType) {
    this._card = data;
  }
}
