import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
        
import { DashboardModule } from './dashboard/dashboard.module';
import { AnalyticModule } from './analytic/analytic.module';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MessageService } from 'primeng/api';

import { InterceptService } from './service/intercept.service';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        AppComponent, 
        NotfoundComponent,
        HeaderComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        AppRoutingModule,
        DashboardModule,
        AnalyticModule,
        LoginModule,
        AdminModule,
        ToastModule,
        SidebarModule,
        ButtonModule
        
    ],
    providers: [
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MessageService, InterceptService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptService,
            multi: true
          }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
