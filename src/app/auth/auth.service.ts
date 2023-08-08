import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {MessageService} from 'primeng/api';
import {HttpClient} from "@angular/common/http";
import { IResponseCode } from "src/app/interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private subject = new Subject<boolean>();
  isLoggedIn: boolean = false
  isAdmin: boolean = false;
  port = "3527"

  constructor(private cookieservice: CookieService, private router: Router, private messageService: MessageService, private http: HttpClient) {
    if( this.cookieservice.get("isAdmin") === "true") {
      this.isAdmin = true
    }
   }

   __getJwtFromCookie() {

    
    let headers = {}
    if (this.cookieservice.check("jwt")) {
   
        headers = {
            "authorization": `jwt ${this.cookieservice.get("jwt")}`
        }
    }
    return headers
  }

   verifyJwt() {
    let header = this.__getJwtFromCookie()
  
    return this.http.get<IResponseCode>(`http://localhost:${this.port}/api/serviceapi/checktoken` ,{headers: header})
  }

  getLogInStatus(): boolean {
    return (this.cookieservice.check("jwt"));
  } 

  logIn(token: string, isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.cookieservice.set("jwt", token)
    this.cookieservice.set("isAdmin", this.isAdmin.toString())
    
    this.isLoggedIn = true;
    this.subject.next(true);
  }

  logout() {
    this.messageService.add({
      severity: 'error',
      summary: 'Sessoin Expired',
      detail: 'Please log in again'
    });
    this.cookieservice.delete('jwt');
    this.isLoggedIn = false;
    this.subject.next(false);
    this.router.navigate(["/login"])
  }


  getLogInChangeEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }

}
