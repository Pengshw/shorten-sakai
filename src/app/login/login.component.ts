
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    token: string | undefined;
    showPassword: boolean = false;
    public captchaResolved : boolean = false;

    registerForm = this.fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required],
        recaptchaResponse: ""
    })
    

    constructor(
        private fb: FormBuilder, 
        private http:HttpClient, 
        private router: Router, 
        private messageService: MessageService,
        private authService: AuthService
    ) {}
  
    togglePasswordVisibility(): void { // Add this method for password visibility toggle
      this.showPassword = !this.showPassword;
    }
    onSubmit(): void {

        let body = this.registerForm.value
        
        if (!this.captchaResolved) {
            this.messageService.add({
                severity: 'error', 
                summary: 'Invalid Captcha',
                detail: 'Please complete the captcha'
            });
            return
        }
        
        this.http.post<any>('http://localhost:3527/login', body, {headers: {}, withCredentials: true } ).subscribe(data=> {
           
            if (data.code !== "AP000") {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Invalid Login Credential',
                    detail: 'Please enter a valid login credential'
                });
            }

            if (data.token != "" && data.code == "AP000") { 
               
                let isadmin = data.role == 1 
              
                this.authService.logIn(data.token, isadmin);

                this.router.navigate([""])
            } 
        })
    }

    checkCaptcha(captchaResponse : string) {    this.captchaResolved = captchaResponse && captchaResponse.length > 0}

    handleClick(e: any) {
        this.onSubmit();
    }

}
