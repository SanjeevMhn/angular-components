import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from "../data-table/data-table.component";
import { SearchSelectComponent } from "../search-select/search-select.component";
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArcElement, CategoryScale, Chart, ChartData, ChartMeta, ChartType, Legend, LinearScale, LineController, LineElement, PieController, PointElement, Ticks, Title } from 'chart.js';

Chart.register(LineController, LineElement, LinearScale, Title, CategoryScale, PointElement, Legend, PieController, ArcElement)

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataTableComponent, SearchSelectComponent, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('lineChart') lineChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;
  lineCanvas!: CanvasRenderingContext2D | null;
  pieCanvas!: CanvasRenderingContext2D | null;
  lineChartData: ChartData = {
    labels: ['January', "February", "March", "April", "May", "June", "July", "August", "September", "October"],
    datasets: [{
      label: "New Members per month",
      data: [12, 19, 3, 5, 2, 3, 22, 15, 12, 7],
      backgroundColor: "rgba(255, 99, 132,0.4)",
      borderColor: "rgba(255, 99, 132)",
      fill: true,
      borderWidth: 3,
      hoverOffset: 4
    }],
  };

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
      drawActiveElementsOnTop: true
    }]
  }

  ngAfterViewInit(): void {
    this.lineCanvas = (<HTMLCanvasElement>this.lineChart.nativeElement).getContext('2d');
    if (this.lineCanvas !== null) {
      const c: Chart = new Chart(this.lineCanvas, {
        type: 'line',
        data: this.lineChartData,
        options: {
          responsive: true,
        },
      })
    }

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

  options$ = new BehaviorSubject<Array<string>>([
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Biratnagar",
    "Pokhara",
    "Chitwan",
    "Birgunj",
    "Palpa",
    "Jhapa",
    "Nepalgunj",
    "Mustang"
  ])

  searchSubject = new Subject<string>();
  searchText = this.searchSubject.pipe(
    startWith(""),
    debounceTime(600),
    map(search => search)
  )

  results$ = combineLatest([this.options$, this.searchText]).pipe(
    switchMap(([options, search]) => {
      return search !== '' ?
        of(options.filter((value: string) => value.toLowerCase().includes(search.toLowerCase()))) :
        of(options)
    })
  )

  dropdownSelectedItem!: any;

  sanitizer = inject(DomSanitizer);

  dataCardList = new BehaviorSubject<Array<{
    icon: SafeHtml | null,
    name: string,
    data: number
  }>>([
    {
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M290.8 48.6l78.4 29.7L288 109.5 206.8 78.3l78.4-29.7c1.8-.7 3.8-.7 5.7 0zM136 92.5l0 112.2c-1.3 .4-2.6 .8-3.9 1.3l-96 36.4C14.4 250.6 0 271.5 0 294.7L0 413.9c0 22.2 13.1 42.3 33.5 51.3l96 42.2c14.4 6.3 30.7 6.3 45.1 0L288 457.5l113.5 49.9c14.4 6.3 30.7 6.3 45.1 0l96-42.2c20.3-8.9 33.5-29.1 33.5-51.3l0-119.1c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-1.3-.5-2.6-.9-3.9-1.3l0-112.2c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-12.8-4.8-26.9-4.8-39.7 0l-96 36.4C150.4 48.4 136 69.3 136 92.5zM392 210.6l-82.4 31.2 0-89.2L392 121l0 89.6zM154.8 250.9l78.4 29.7L152 311.7 70.8 280.6l78.4-29.7c1.8-.7 3.8-.7 5.7 0zm18.8 204.4l0-100.5L256 323.2l0 95.9-82.4 36.2zM421.2 250.9c1.8-.7 3.8-.7 5.7 0l78.4 29.7L424 311.7l-81.2-31.1 78.4-29.7zM523.2 421.2l-77.6 34.1 0-100.5L528 323.2l0 90.7c0 3.2-1.9 6-4.8 7.3z"/></svg>'),
      name: 'Products',
      data: 300
    },
    {
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>'),
      name: 'Orders',
      data: 500
    },
    {
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>'),
      name: 'Members',
      data: 800
    },
    {
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>'),
      name: 'Delivered',
      data: 1500
    }
  ])

  popularProducts$ = new BehaviorSubject<Array<{
    id: number,
    name: string,
    category: string,
    sales: number
  }>>([
    {
      id: 1,
      name: 'Women\'s Jacket',
      category: 'clothes',
      sales: 200
    },
    {
      id: 2,
      name: 'Hoodie',
      category: 'clothes',
      sales: 120
    },
    {
      id: 3,
      name: 'Women\'s Necklace',
      category: 'jewelary',
      sales: 100
    },
    {
      id: 4,
      name: 'Joggers',
      category: 'clothes',
      sales: 100
    },
  ])

  recentAddedProducts$ = new BehaviorSubject<Array<{
    id: number,
    name: string,
    category: string,
  }>>([
    {
      id: 1,
      name: 'Waffle Shirt',
      category: 'clothes',
    },
    {
      id: 2,
      name: 'Sweaters',
      category: 'clothes',
    },
    {
      id: 3,
      name: 'Baseball Jackets',
      category: 'clothes',
    },
    {
      id: 4,
      name: 'Oversized Tshirts',
      category: 'clothes',
    },
  ])

  searchResults(keyword: string) {
    this.searchSubject.next(keyword);
  }

  selectedItem(item: string | number) {
    this.dropdownSelectedItem = item;
  }

  popularGridPageEvent(event: any) { }

  searchPopularGrid(event: any) { }
}
