import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  Chart,
  ChartData,
  LinearScale,
  LineController,
  LineElement,
} from 'chart.js';

Chart.register(LineController, LineElement, LinearScale);
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  template: ` 
  <div class="canvas-container">
    <h2 class="header-text">Line Chart</h2>
    <canvas #lineChart id="lineChart"></canvas>
  </div>`,
  styles: `
    :host{
      height: 100%;
      width: 100%;
      
    }
    .canvas-container{
      height: 100%;
      width: 100%;
      border-radius: 0.8rem;
      box-shadow: 0 0 0 1px #00000054;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    canvas{
      height: calc(100% - 7rem)!important;
      padding: 0 2rem;
      min-height: 22rem;
    }

    @media screen and (max-width: 890px){
      canvas{
        padding: 0 0.8rem;
        height: 100%!important;
      }
    }
  `,
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef;
  lineCanvas!: CanvasRenderingContext2D | null;

  lineChartData: ChartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
    ],
    datasets: [
      {
        label: 'New Members per month',
        data: [12, 19, 3, 5, 2, 3, 22, 15, 12, 7],
        backgroundColor: 'rgba(255, 99, 132,0.4)',
        borderColor: 'rgba(255, 99, 132)',
        borderWidth: 3,
      },
    ],
  };

  ngAfterViewInit(): void {
    this.lineCanvas = (<HTMLCanvasElement>(
      this.lineChart.nativeElement
    )).getContext('2d');
    if (this.lineCanvas !== null) {
      const c: Chart = new Chart(this.lineCanvas, {
        type: 'line',
        data: this.lineChartData,
        options: {
          responsive: true,
        },
      });
    }
  }
}
