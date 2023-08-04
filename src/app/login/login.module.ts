import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';

import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../../environments/environment';

import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ToastModule
  ], 

  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6LfHJHwnAAAAAG5y1a7F5BcoPjYXJEBBNfL6Lqpf"
      } as RecaptchaSettings,
    },
  ],
})
export class LoginModule { }
