import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IUrlFormBody } from './interfaces.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ShortlinkService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  private __getJwtFromCookie() {
    let headers = {}
    console.log("header: ", headers)
    if (this.cookieService.check("jwt")) {
   
        headers = {
            "authorization": `jwt ${this.cookieService.get("jwt")}`
        }
    }
    return headers
}


  getNewShortUrl(body: IUrlFormBody) {
    let header = this.__getJwtFromCookie()
    return this.http.post<any>('http://localhost:3527/api/shortenlonglink', body, {headers: header})
  }
}
