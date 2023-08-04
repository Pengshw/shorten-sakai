import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import {TabMenuModule} from 'primeng/tabmenu';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { CreateFormComponent } from './create-form/create-form.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { DeleteFormComponent } from './delete-form/delete-form.component';
import { ReadFormComponent } from './read-form/read-form.component';
import { ReadPermissionFormComponent } from './read-permission-form/read-permission-form.component';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    CreateFormComponent,
    UpdateFormComponent,
    DeleteFormComponent,
    ReadFormComponent,
    ReadPermissionFormComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    TabMenuModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
    RadioButtonModule,
		InputTextModule
  ]
})
export class AdminModule { }
