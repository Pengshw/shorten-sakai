import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/service';
import { MessageService } from 'primeng/api';
import { IUserItem } from 'src/app/interface';

@Component({
  selector: 'app-user-admin-dashboard',
  templateUrl: './user-admin-dashboard.component.html',
  styleUrls: ['./user-admin-dashboard.component.scss']
})
export class UserAdminDashboardComponent implements OnInit {
  
  items: MenuItem[] = [
    { label: "Create", icon: "pi pi-user-plus" },
    { label: "Update", icon: "pi pi-user-edit"},
    { label: "Read", icon: "pi pi-search" },
    { label: "Delete", icon: "pi pi-trash" }
  ];
  activeItem: MenuItem = {}


  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.activeItem = this.items[0]
  }
  
  onActiveItemChange(e:MenuItem) {
    this.activeItem = e 
  }


  registerBrowserUserForm = this.fb.group({
    username: "",
    password: "",
    role: "",
    activeStatus: "1"
  })

  onBrowserUserRegisterSubmit = () => {
    const body = this.registerBrowserUserForm.value
    this.adminService.callApi("register", body).subscribe(data => {
      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'User has been registered'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There is an error in registration'
        });
      }
    })
  }

  updateUserForm = this.fb.group({
    username: "",
    role: "",
    activestatus: ""
  })

  onUpdateUserFormSubmit() {
    let body = this.updateUserForm.value
    
    this.adminService.callApi("user/update/item", body).subscribe(data => {
      console.log("data: ", data)
      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'User has been updated'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There is an error in updating'
        });
      }
    })
  }

  users: IUserItem[] = []

  displayUser(data: IUserItem) {
    this.users.push(data)
  }

  clearUsers() {
    this.users = []
  }

  searchInputForm = this.fb.group({
    searchinput: ""
  })

  onSearchInputFormSubmit() {
    let body = this.searchInputForm.value
    this.adminService.callApi("user/view/search", body).subscribe(data => {
      this.clearUsers()
      for (let user of data.record) {
        this.displayUser(user)
      }
    })
  }

  searchIdForm = this.fb.group({
    id: ""
  })

  onSearchIdFormSubmit() {
    let body = this.searchIdForm.value

    this.adminService.callApi("user/view/id", body).subscribe(data => {
      console.log("data: ", data)
      this.clearUsers()
      this.displayUser(data.record)
    })
  }

  deleteItemForm = this.fb.group({
    id: ""
  })

  onDeleteItemFormSubmit() {
    let body = this.deleteItemForm.value
    this.adminService.callApi("user/delete/item", body).subscribe(data => {
      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'User has been deleted'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There is an error in deleting'
        });
      }
    })
  }
}
