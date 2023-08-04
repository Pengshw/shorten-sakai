import { Component, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { AnalyticService } from 'src/app/analytic.service';
import { ISitesItem } from 'src/app/interfaces.interface';
import { Subscription } from 'rxjs';
import { CalendarService } from 'src/app/calendar.service';


@Component({
  selector: 'app-most-visited-graph',
  templateUrl: './most-visited-graph.component.html',
  styleUrls: ['./most-visited-graph.component.css']
})
export class MostVisitedGraphComponent implements OnInit {
  clickEventsubscription:Subscription
  constructor(private analyticService: AnalyticService, private calendarService: CalendarService) {
      this.clickEventsubscription = this.calendarService.getClickEvent().subscribe((data)=>{
        console.log("data: ", data)
        this.updateChart(data)
    })
  }

  items: ISitesItem[] = []
  total: number = 1
  totalRecord: number  = 1
  itemsDisplay: ISitesItem[] = []

  ngOnInit(): void {
    this.updateChart([])

  }

  updateChart(dates: Date[]) {
    this.analyticService.getMostVisitedDomains(dates).subscribe( (data: ISitesItem[]) => {
      this.items = data
      this.total = data.map(item => item.count).reduce( (x, y) => {return x+y}, 0)
      this.totalRecord = data.length
      this.updateDisplayItems(0, 5)
    })
    return
  }


  round(i: number) {
    return Math.round(i)
  } 

  updateDisplayItems(start:number=0, end:number) {
    this.itemsDisplay = this.items.slice(start, end)
  }

  onPageChange(e: any) {
    this.updateDisplayItems(e.page*e.rows, (e.page+1)*e.rows)
  }
  
}
