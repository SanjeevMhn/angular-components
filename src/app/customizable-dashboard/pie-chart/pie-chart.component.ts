import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  template: `
   <div class="canvas-container">
    <h2 class="header-text">Pie Chart</h2>
    <canvas #pieChart id="pieChart"></canvas>
  </div>
  `,
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
  `
})
export class PieChartComponent implements AfterViewInit {

  @ViewChild('pieChart') pieChart!: ElementRef;
  pieCanvas!: CanvasRenderingContext2D | null;
  pieChartData: ChartData = {
    labels: [
      'Kathmandu',
      'Lalitpur',
      'Bhaktapur',
      'Dharan',
      'Pokhara'
    ],
    datasets: [{
      data: [800, 300, 500, 250, 200],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(179, 86, 255)',
        'rgb(86, 255, 218)'
      ],
      hoverOffset: 4,
    }],
  }

  ngAfterViewInit(): void {
    this.pieCanvas = (<HTMLCanvasElement>this.pieChart.nativeElement).getContext('2d');
    if (this.pieCanvas !== null) {
      const c: Chart = new Chart(this.pieCanvas, {
        type: 'pie',
        data: this.pieChartData,
        options: {
          responsive: true,
        },
      })
    }
  }
}
