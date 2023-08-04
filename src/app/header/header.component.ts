
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit{
  logInChangeEventSubscription: Subscription
  
  // @HostListener("window:scroll", ['$event']) onScroll(event: any) {
  //   const verticalOffset = window.scrollY 
  //         || document.documentElement.scrollTop 
  //         || document.body.scrollTop || 0;
  //   console.log(verticalOffset)
  // }
  
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  sidebarVisible3 = false;
  constructor(private authService: AuthService,private cookieService: CookieService, private messageService: MessageService) {
    this.logInChangeEventSubscription = this.authService.getLogInChangeEvent().subscribe((status)=>{
      this.isLoggedIn = status
      this.isAdmin = authService.isAdmin
    })
  }


  ngOnInit() {
    if (this.authService.getLogInStatus()) {
      this.isLoggedIn = true;
    }
    this.isAdmin = this.authService.isAdmin
    console.log(this.isAdmin)
    console.log(this.isLoggedIn);
    

  }

  handleLogOutClick = () => {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Logout',
      detail: 'Successfully logged out'
    })
    this.isLoggedIn = false;

  }
}

