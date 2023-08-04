import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

import { IResponseCode } from './interfaces.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private port = 3527;

  private __getJwtFromCookie() {
    let headers = {}
    if (this.cookieService.check("jwt")) {
   
        headers = {
            "authorization": `jwt ${this.cookieService.get("jwt")}`
        }
    }
    return headers
}


  constructor(private http:HttpClient, private cookieService: CookieService) { }

  registerUser(body:any) {
    const header = this.__getJwtFromCookie();
    return this.http.post<IResponseCode>(`http://localhost:${this.port}/api/serviceapi/register/new`, body ,{headers: header})
  }

  updateActivateStatus(body: any) {
    const header = this.__getJwtFromCookie();
    return this.http.post<IResponseCode>(`http://localhost:${this.port}/api/serviceapi/update/activestatus`, body ,{headers: header})
  }

  updateRole(body: any) {
    const header = this.__getJwtFromCookie();
    return this.http.post<IResponseCode>(`http://localhost:${this.port}/api/serviceapi/update/role`, body ,{headers: header})
  }

  callApi(url:string, body: any) {
    const header = this.__getJwtFromCookie();
    return this.http.post<IResponseCode>(`http://localhost:${this.port}/${url}`, body ,{headers: header})
  }

  callGetApi(url:string) {
    const header = this.__getJwtFromCookie();
    return this.http.get<IResponseCode>(`http://localhost:${this.port}/${url}` ,{headers: header})
  }

}
