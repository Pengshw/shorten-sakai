import { Component, } from '@angular/core';
import { ICardInfo,  IClickCountItem} from "src/app/interface"
import { CalendarService, AnalyticService } from 'src/app/service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})

export class UpdatesComponent {
    clickEventsubscription:Subscription


    constructor(
        private analyticsService: AnalyticService, 
        private calendarService: CalendarService,
        private authService: AuthService,
        private messageService: MessageService
        ) {        
        this.clickEventsubscription = this.calendarService.getClickEvent().subscribe((data)=>{
            this.generateTotalClick(data);
            this.generateTotalNewUrl(data);
        })
    }

    totalClicks: ICardInfo = {
        field: "",
        data_title: "",
        data: "",
        subdata_title: "",
        subdata: ""
    };


    newUrlGeneratedItem: ICardInfo = {
        field: "",
        data_title: "",
        data: "",
        subdata_title: "",
        subdata: ""
    };
    

    

    generateTotalClick(dates: Date[]) {
        let totalClick = this.analyticsService.getTotalClick(dates)
   
        totalClick.subscribe( (data: IClickCountItem) => {
   
            
            let newField: ICardInfo = {
                field: "Total clicks",
                data_title : "",
                data: `${data.click_count}`,
                subdata_title: "",
                subdata: ""
            }
            this.totalClicks = newField
            
        })
    }

    generateTotalNewUrl(dates: Date[]) {
        let totalClick = this.analyticsService.getTotalNewUrl(dates)
        totalClick.subscribe( (data: IClickCountItem) => {
          
            if (data.code == "AT000") {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Session Expired',
                    detail: 'Please login to continue'
                  });
                this.authService.logout()

            } else {
                let newField: ICardInfo = {
                    field: "Total new short url generated",
                    data_title : "",
                    data: `${data.click_count}`,
                    subdata_title: "",
                    subdata: ""
                }
                this.newUrlGeneratedItem = newField
            }
        })
    }
    

    ngOnInit() {
        this.generateTotalClick([]);
        this.generateTotalNewUrl([]);
    }
}
