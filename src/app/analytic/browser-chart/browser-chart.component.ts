import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarService, AnalyticService } from 'src/app/service';

@Component({
  selector: 'app-browser-chart',
  templateUrl: './browser-chart.component.html',
  styleUrls: ['./browser-chart.component.css']
})
export class BrowserChartComponent implements OnInit {
  clickEventsubscription:Subscription
  constructor(private analyticService: AnalyticService, private calendarService: CalendarService) {
    this.clickEventsubscription = this.calendarService.getClickEvent().subscribe((data)=>{
      this.updateChart(data)
  })
  }
  
  private backgroundColor = ["#FFEADD", "#FCAEAE", "#FF8989", "#FF6666", "#FFEADD", "#FCAEAE", "#FFDC00", "#FF6666", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]

  data = {}
  options = {}
  xValues: string[] | null = null;
  yValues: number[] | null = null

  ngOnInit(): void {
 
    this.updateChart([]);
    
  }

  updateChart(dates: Date[]) {
    this.analyticService.getBrowserData(dates).subscribe(data => {
    
      this.xValues = data.map(x => x.stat_browser)
      this.yValues = data.map(x => x.browserCount)
      this.data = {
        labels: this.xValues,
        datasets: [{
          data: this.yValues,
          backgroundColor: this.backgroundColor.slice(0, this.xValues.length)
        }]
      }
      this.options = {
        title : {
          "text": "Browser distribution"
        }
      }
    })
  }

}
