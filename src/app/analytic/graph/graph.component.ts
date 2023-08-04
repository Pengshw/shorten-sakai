import { Component, OnInit} from '@angular/core';
import { AnalyticService } from "../../analytic.service"
import { Subscription, from } from 'rxjs';
import { CalendarService } from 'src/app/calendar.service';
import { FormBuilder } from '@angular/forms';
import { IDateItem, IGraphPoints } from 'src/app/interfaces.interface';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit {
    data: any = {};
    options: any = {};
    dates: Date[] = []
    dataset: any[] = []
    dateLabels: string[] = []
    linkLines: string[] = []
    private colors = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]

    clickEventsubscription:Subscription


    constructor(private analyticService: AnalyticService, private calendarService: CalendarService, private fb: FormBuilder) {
        this.clickEventsubscription = this.calendarService.getClickEvent().subscribe((data)=>{
            this.dates = data;
            this.resetGraph();
            for (let item of this.linkLines) {
                this.addLine(data, item);
            }
            
        })
    }

    ngOnInit() {
        let dateItem: IDateItem = this.analyticService.getTodayAndLastWeekDate();
        this.dates = [dateItem.weekBeforeDate, dateItem.todayDate]
        this.addLine(this.dates, "all");
    }


    addLine(dates: Date[], link:string, update:boolean=true) {
        let label_date = this.__getDatesBetween(dates[0], dates[1])
        let labels = label_date.map(item => `${item.getFullYear()}-${(item.getMonth()+1).toString().padStart(2,"0")}-${item.getDate()}`)
        let data: number[] = []
       
        this.analyticService.getClicksOverTimeData(dates, link).subscribe(res => {
            if (res.length == 0) return

            if (!this.linkLines.includes(link)) this.linkLines.push(link)

            let labelValues = res.map(item => item.count_date)
            let yVal: number[] = res.map(item => item.click_count)
           
            for (let i = 0; i < labels.length; i++) {
                if (labelValues.indexOf(labels[i]) != -1) {
                    data.push( yVal[labelValues.indexOf(labels[i])] )
                } else {
                    data.push(0);
                }
            }
            
            this.dataset.push(
                {
                    label: link,
                    data: data,
                    borderColor: this.colors[this.linkLines.indexOf(link)],
                    fill: false,
                    pointRadius: 0
                }
            ) 
            this.dateLabels = labels
            
            if (update) this.updateGraph()
            
        })
        
        
    }

    resetGraph() {
        this.dateLabels = []
        this.dataset = []
        this.data = {}
    }
    updateGraph() {
        this.data = {
            labels: this.dateLabels,
            datasets: this.dataset
          }
      
    }

    private __getDatesBetween = (startDate: Date, endDate: Date) => {
        const dates = [];
        if (endDate.getMilliseconds() < startDate.getMilliseconds() ){
            return []
        }

        let currentDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
        );
    
        while (currentDate <= endDate) {
            dates.push(currentDate);
    
            currentDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() + 1, 
            );
        }
        return dates;
    };  


    linkForm = this.fb.group({
        link: ""
      })
    
    onLinkFormSubmit = () => {
        this.addLine(this.dates, (this.linkForm.value.link) as string );
    }
}
