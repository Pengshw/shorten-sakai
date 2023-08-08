import { Component, OnInit } from '@angular/core';
import { ISitesItem } from 'src/app/interface';
import { Subscription } from 'rxjs';
import { CalendarService, AnalyticService } from 'src/app/service';


@Component({
  selector: 'app-most-visited-graph',
  templateUrl: './most-visited-graph.component.html',
  styleUrls: ['./most-visited-graph.component.css']
})
export class MostVisitedGraphComponent implements OnInit {
  clickEventsubscription:Subscription
  constructor(private analyticService: AnalyticService, private calendarService: CalendarService) {
      this.clickEventsubscription = this.calendarService.getClickEvent().subscribe((data)=>{
   
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
  }


  round(i: number) {
    return Math.round(i)
  } 

  updateDisplayItems( end:number, start:number=0,) {
    this.itemsDisplay = this.items.slice(start, end)
  }

  onPageChange(e: any) {
    this.updateDisplayItems((e.page+1)*e.rows, e.page*e.rows)
  }
  
}
