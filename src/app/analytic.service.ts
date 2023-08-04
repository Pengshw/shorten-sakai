import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ILatestUrlItem, IClickCountItem } from "./interfaces.interface"
import { CookieService } from 'ngx-cookie-service';
import { IBrowserData, IOsData, IClickData, IDateItem, ISitesItem } from './interfaces.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnalyticService {
    
    constructor(private http:HttpClient, private cookieService: CookieService) { }

    private port = "3527"

    private __getJwtFromCookie() {
        let headers = {}
        if (this.cookieService.check("jwt")) {
       
            headers = {
                "authorization": `jwt ${this.cookieService.get("jwt")}`
            }
        }
        return headers
    }

    getTodayAndLastWeekDate(): IDateItem {
        var date = new Date();
        var today = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} 23:59:59`
        var weekBefore = new Date(date.getTime()- 6.048e+8) 
        var weekBeforeDate = `${weekBefore.getFullYear()}/${weekBefore.getMonth()+1}/${weekBefore.getDate()} 00:00:00`
        return {
            "todayDate": date,
            "weekBeforeDate": weekBefore,
            "todayString": today,
            "weekBeforeString": weekBeforeDate
        }
    }
    
    private __getDateStringParams(dates: Date[]) {
        let weekBeforeDate = ""
        let today = ""
        if (dates.length == 0) {
            let default_dates = this.getTodayAndLastWeekDate();
            weekBeforeDate = default_dates.weekBeforeString
            today = default_dates.todayString
        } else {
            let weekBefore:Date = dates[0]
            let todaydate:Date = dates[1]
            weekBeforeDate = `${weekBefore.getFullYear()}/${weekBefore.getMonth()+1}/${weekBefore.getDate()} 00:00:00`
            today = `${todaydate.getFullYear()}/${todaydate.getMonth()+1}/${todaydate.getDate()} 23:59:59`
        }
        return {
            weekBeforeParam: weekBeforeDate,
            todayParam: today
        }

    }

    getClicksPerUrl(dates: Date[]) {
        let dateParams = this.__getDateStringParams(dates);
        let header = this.__getJwtFromCookie()
        
        return this.http.get<any[]>(`http://localhost:${this.port}/clicksPerUrl?start_date=${dateParams.weekBeforeParam}&end_date=${dateParams.todayParam}`, {headers: header})
    }

    getLatestUrl() {
        let header = this.__getJwtFromCookie()
        return this.http.get<ILatestUrlItem>(`http://localhost:${this.port}/latestUrl`, {headers: header})
    }

    getTotalClick(dates: Date[]) {
        let dateParams = this.__getDateStringParams(dates);
        let header = this.__getJwtFromCookie()
        console.log(`http://localhost:${this.port}/clickCount?start_date=${dateParams.weekBeforeParam}&end_date=${dateParams.todayParam}`)
        return this.http.get<IClickCountItem>(`http://localhost:${this.port}/clickCount?start_date=${dateParams.weekBeforeParam}&end_date=${dateParams.todayParam}`,{headers: header})
    }

    getTotalNewUrl(dates: Date[]) {
        let dateParams = this.__getDateStringParams(dates);
        let header = this.__getJwtFromCookie()

        return this.http.get<IClickCountItem>(`http://localhost:${this.port}/newUrlCount?start_date=${dateParams.weekBeforeParam}&end_date=${dateParams.todayParam}`, {headers: header})
    }

    getBrowserData(dates: Date[]) {
        let dateParams = this.__getDateStringParams(dates);
        let header = this.__getJwtFromCookie()

        return this.http.get<IBrowserData[]>(`http://localhost:${this.port}/getBrowserData?start_date=${dateParams.weekBeforeParam}&end_date=${dateParams.todayParam}`, {headers: header})
     
    }

    getOsData(dates: Date[]) {
        let dateParams = this.__getDateStringParams(dates);
        let header = this.__getJwtFromCookie()

        return this.http.get<IOsData[]>(`http://localhost:${this.port}/getOsData?start_date=${dateParams.weekBeforeParam}&end_date=${dateParams.todayParam}`, {headers: header})
     
    }

    getClicksOverTimeData(dates: Date[], link:string) {
        let dateParams = this.__getDateStringParams(dates);
        let header = this.__getJwtFromCookie()
        let linkParam;
        
        if (link != "" && link != "all") {
            linkParam = `&link=${link}`
        } else if (link == "all" || link == "") {
            linkParam = ""
        }
       
        return this.http.get<IClickData[]>(`http://localhost:${this.port}/getClicksOverTime?start_date=${dateParams.weekBeforeParam}&end_date=${dateParams.todayParam}${linkParam}`, {headers: header})

    }

    getMostVisitedDomains(dates: Date[]) {
        let dateParams = this.__getDateStringParams(dates);
        let header = this.__getJwtFromCookie()

        return this.http.get<ISitesItem[]>(`http://localhost:${this.port}/getMostVisitedUrls?start_date=${dateParams.weekBeforeParam}&end_date=${dateParams.todayParam}`, {headers: header})
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
          (`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

}
