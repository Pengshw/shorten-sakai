import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { IResponseCode } from 'src/app/interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private port = 3527;



  constructor(private http:HttpClient, private cookieService: CookieService, private authService: AuthService) { }



  registerUser(body:any) {
    const header = this.authService.__getJwtFromCookie();
    return this.http.post<IResponseCode>(`http://localhost:${this.port}/api/serviceapi/register/new`, body ,{headers: header})
  }

  updateActivateStatus(body: any) {
    const header = this.authService.__getJwtFromCookie();
    return this.http.post<IResponseCode>(`http://localhost:${this.port}/api/serviceapi/update/activestatus`, body ,{headers: header})
  }

  updateRole(body: any) {
    const header = this.authService.__getJwtFromCookie();
    return this.http.post<IResponseCode>(`http://localhost:${this.port}/api/serviceapi/update/role`, body ,{headers: header})
  }

  callApi(url:string, body: any) {
    const header = this.authService.__getJwtFromCookie();
    return this.http.post<IResponseCode>(`http://localhost:${this.port}/${url}`, body ,{headers: header})
  }

  callGetApi(url:string) {
    const header = this.authService.__getJwtFromCookie();
    return this.http.get<IResponseCode>(`http://localhost:${this.port}/${url}` ,{headers: header})
  }

}
