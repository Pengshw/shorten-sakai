import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private subject = new Subject<boolean>();
  isLoggedIn: boolean = false
  isAdmin: boolean = false;
  constructor(private cookieservice: CookieService, private router: Router, private messageService: MessageService) {
    if( this.cookieservice.get("isAdmin") === "true") {
      this.isAdmin = true
    }
   }

 

  getLogInStatus(): boolean {
    return (this.cookieservice.check("jwt"));
  } 

  logIn(token: string, isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.cookieservice.set("jwt", token)
    this.cookieservice.set("isAdmin", this.isAdmin.toString())
    console.log(this.cookieservice.get('jwt'))
    this.isLoggedIn = true;
    this.subject.next(true);
  }

  logout() {
    this.cookieservice.delete('jwt');
    this.isLoggedIn = false;
    this.subject.next(false);
    this.router.navigate(["/login"])
  }


  getLogInChangeEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }

}
