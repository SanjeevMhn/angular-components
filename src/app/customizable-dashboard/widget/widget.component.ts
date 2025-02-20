import {
  AfterViewInit,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { DynamicWidgetService, Widget } from '../../dynamic-widget.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    @if(widget){
    <article
      class="widget"
      [draggable]="store.editMode"
      (dragstart)="onDragStart($event, widget)"
      (drop)="onDrop($event, widget)"
      (dragover)="onDragOver($event)"
    >
    <div class="inner-container">
      @if(showOption){
      <div class="widget-header">
        <button type="button" class="settings btn" (click)="toggleOptions()">
          <span class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </span>
        </button>
      </div>
      <div class="widget-content">
        <p class="message">Cannot change height and width on small screens.</p>
        <div class="control">
          <p>Width</p>
          <ul class="option">
            @for(opt of options; track $index){
            <li
              [class.active]="widget.cols == opt"
              (click)="store.updateWidget(widget.id, { cols: opt })"
            >
              {{ opt }}
            </li>
            }
          </ul>
        </div>
        <div class="control">
          <p>Height</p>
          <ul class="option">
            @for(opt of options; track $index){
            <li
              [class.active]="widget.rows == opt"
              (click)="store.updateWidget(widget.id, { rows: opt })"
            >
              {{ opt }}
            </li>
            }
          </ul>
        </div>
      </div>
      }@else { @if(store.editMode){
      <div class="widget-header">
        <button
          type="button"
          class="settings btn"
          (click)="toggleOptions(true)"
        >
          <span class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
              />
            </svg>
          </span>
        </button>
      </div>
      }
      <div class="widget-content">
        @if(widget.component !== null){
        <ng-container [ngComponentOutlet]="widget.component"></ng-container>
        }
      </div>
      }
    </div>
    </article>
    }
  `,
  styles: `
    @media(max-width: 890px){
      :host{
        grid-area: unset!important;
        flex: 0 0 calc(100% / 2);
        width: 100%;
      }
      .widget{
        .inner-container{
          padding: 1rem;
          .widget-content{
            .message{
              display: block;
              text-align: center;
            }
            .control{
              display: none;
            }
          }
        }
      }
    }

    @media(max-width: 690px){
      :host{
        flex: 0 0 calc(100%);
        width: 100%;
      }
    }

    :host{
      color: #000;
      height: 100%;
    }
    .widget-header{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .icon-container{
        --size: 1.6rem;
      }
    }
    .settings{
      padding: 0.5rem;
      background: #fff;
      border: 1px solid #222;
      border-radius: 0.8rem 0.8rem 0 0;
      border-bottom-width: 0;
    }
    .widget{
      position: relative;
      isolation: isolate;
      height: 100%;
      .inner-container{
        height: 100%;
      }
      &:has(.widget-header){
        .widget-content{
          height: calc(100% - 3rem);
          border: 1px solid #222;
          border-radius: 0.8rem 0 0.8rem 0.8rem;
          cursor: move;
        }
      }
      .widget-content{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
        justify-content: center;
        background: #fff;
        min-height: 9rem;
        .message{
          display: none;
        }
       }
    }
    .control{
      display: flex;
      gap: 0.8rem;
      align-items: center;
      .option{
        display: flex;
        align-items: center;
        li{
          padding: 0.5rem;
          cursor: pointer;
          --size: 2rem;
          border: 2px solid #222;
          width: var(--size);
          height: var(--size);
          display: flex;
          align-items: center;
          justify-content: center;
          &.active{
            background: rgba(92, 178, 248, 0.48);
          }

          &:first-child{
            border-top-left-radius: 100vh;
            border-bottom-left-radius: 100vh;
          }
          &:last-child{
            border-top-right-radius: 100vh;
            border-bottom-right-radius: 100vh;
          }
          &:not(:last-child){
            border-right-width: 0;
          }
          
        }

      }
    }
    @media(max-width: 1390px){
      .control{
        p{
          font-size: 1.4rem;
        }
        .option{
          li{
            padding: 0.25rem;
            --size: 1.4rem;
            font-size: 1.4rem;
          }
        }
      }
    }
  `,
  host: {
    '[style.grid-area]':
      '"span " + (widget.rows ?? 1) + "/ span " + (widget.cols ?? 1)',
  },
})
export class WidgetComponent{
  @Input() widget!: Widget;
  store = inject(DynamicWidgetService);
  showOption = false;
  options: Array<number> = [1, 2, 3, 4, 5, 6];

  toggleOptions(state = false) {
    this.showOption = state;
  }

  onDragStart(event: DragEvent, widget: Widget) {
    if(!this.store.editMode){
      event.preventDefault();
      return
    }
    this.store.draggedItemComp =
      widget.component !== null ? widget.component : null;
    event.dataTransfer?.setData('text/plain', JSON.stringify(widget));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, widget: Widget) {
    if(!this.store.editMode){
      event.preventDefault();
      return
    }
    event.preventDefault();
    let draggedWidget: Widget = JSON.parse(
      event.dataTransfer?.getData('text/plain')!
    );
    this.store.moveWidgets(
      { ...draggedWidget, component: this.store.draggedItemComp },
      widget
    );
  }
}
