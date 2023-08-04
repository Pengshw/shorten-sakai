import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UrlformComponent } from './urlform/urlform.component';
import { UrlOverlayComponent } from './url-overlay/url-overlay.component';
import { CopyButtonComponent } from './copy-button/copy-button.component';

import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ChartModule } from 'primeng/chart';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    UrlformComponent,
    UrlOverlayComponent,
    CopyButtonComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    BrowserAnimationsModule,
    CalendarModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    DynamicDialogModule,
    ToastModule,
    RippleModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
