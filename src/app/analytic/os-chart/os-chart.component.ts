import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarService, AnalyticService} from 'src/app/service';

@Component({
  selector: 'app-os-chart',
  templateUrl: './os-chart.component.html',
  styleUrls: ['./os-chart.component.css']
})

export class OsChartComponent implements OnInit {
  clickEventsubscription:Subscription
  constructor(private analyticService: AnalyticService, private calendarService: CalendarService) {
    this.clickEventsubscription = this.calendarService.getClickEvent().subscribe((data)=>{
      this.updateChart(data)
  })
  }

  label: string[] | null = null
  osCounts: number[] | null = null
  data = {}

  private backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ]
  private borderColor = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ]

  ngOnInit(): void {
    let dates = [new Date("2023/6/1"), new Date("2023/7/31")]
    this.updateChart(dates)
  }

  updateChart = (dates: Date[]) => {
    this.analyticService.getOsData(dates).subscribe(res => {
      this.label = res.map(x => x.stat_os)
      this.osCounts = res.map(x => x.osCount)

      this.data = {
        labels: this.label,
        datasets: [{
          label: this.label,
          data: this.osCounts,
          backgroundColor: this.backgroundColor.slice(0, this.label.length),
          borderColor: this.borderColor.slice(0, this.label.length),
          borderWidth: 1
        }]
      }
    })
  }
}
