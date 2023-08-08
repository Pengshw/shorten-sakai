import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CalendarService } from 'src/app/service';

@Component({
  selector: 'app-analytic-dashboard',
  templateUrl: './analytic-dashboard.component.html',
  styleUrls: ['./analytic-dashboard.component.css']
})
export class AnalyticDashboardComponent {

  calenderForm = this.fb.group({
    start_date: new Date( (new Date()).getTime() - 6.048e+8),
    end_date: new Date
  })


  constructor(private fb: FormBuilder, private calendarService: CalendarService) {}
  handleClick(e: any) {
   
    this.calendarService.sendClickEvent([this.calenderForm.value.start_date, this.calenderForm.value.end_date])
  }
}
