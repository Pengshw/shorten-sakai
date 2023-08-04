import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticDashboardComponent } from './analytic-dashboard/analytic-dashboard.component';
import { GraphComponent } from './graph/graph.component';
import { UpdatesComponent } from './updates/updates.component';
import { BrowserChartComponent } from './browser-chart/browser-chart.component';
import { OsChartComponent } from './os-chart/os-chart.component';
import { MostVisitedGraphComponent } from './most-visited-graph/most-visited-graph.component';


import { ChartModule } from 'primeng/chart';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';

import { AppLayoutModule } from '../layout/app.layout.module';


@NgModule({
  declarations: [
    AnalyticDashboardComponent,
    GraphComponent,
    UpdatesComponent,
    BrowserChartComponent,
    OsChartComponent,
    MostVisitedGraphComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
    ToastModule,
    HttpClientModule,
    DynamicDialogModule,
    ChartModule,
    ButtonModule,
    CalendarModule,
    ProgressBarModule,
    DividerModule,
    PaginatorModule,
    AppLayoutModule,
  ]
})
export class AnalyticModule { }
