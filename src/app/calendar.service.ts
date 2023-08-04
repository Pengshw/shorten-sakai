import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  private subject = new Subject<any>();
  
  sendClickEvent(dates: Date[]) {
    this.subject.next(dates);
  }
  
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
