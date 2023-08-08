import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from "../../service";
import { MessageService } from 'primeng/api';
import { MenuItem } from "primeng/api";


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})


export class AdminDashboardComponent implements OnInit  {
  value: string = '';
  
  readItems: MenuItem[] = [
    { label: "ServiceAPI", icon: "pi pi-user" },
    { label: "Role", icon: "pi pi-user-edit"},
  ]

  items: MenuItem[] = [
    { label: "Create", icon: "pi pi-user-plus" },
    { label: "Update", icon: "pi pi-user-edit"},
    { label: "Read", icon: "pi pi-search" },
    { label: "Delete", icon: "pi pi-trash" }
  ];
  activeItem: MenuItem = {}
  activeReadItem: MenuItem = {}

  ngOnInit(): void {
    this.activeItem = this.items[0]
    this.activeReadItem = this.readItems[0]
   
    
  }

  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) {}
  
  onActiveItemChange(e:MenuItem) {
    this.activeItem = e 
  }

  onReadTabActiveItemChange(e: MenuItem) {
    this.activeReadItem = e
  }


}