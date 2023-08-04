import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { MessageService } from 'primeng/api';
import { IUserItem } from 'src/app/interfaces.interface';


@Component({
  selector: 'app-read-form',
  templateUrl: './read-form.component.html',
  styleUrls: ['./read-form.component.scss']
})
export class ReadFormComponent {
  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) {}
  
  
  searchInputForm = this.fb.group({
    searchinput: ""
  })

  onSearchInputFormSubmit() {
    let body = this.searchInputForm.value
    this.adminService.callApi("api/serviceapi/view/search", body).subscribe(data => {
      this.clearUsers()
      for (let user of data.record) {
        this.displayUser(user)
      }
    })
  }

  searchIdForm = this.fb.group({
    serviceapiid: ""
  })

  onSearchIdFormSubmit() {
    let body = this.searchIdForm.value

    this.adminService.callApi("api/serviceapi/view/item", body).subscribe(data => {
      this.clearUsers()
      this.displayUser(data.record[0])
    })
  }


  users: IUserItem[] = []

  displayUser(data: IUserItem) {
    this.users.push(data)
  }

  clearUsers() {
    this.users = []
  }

  

  

  

  roles: any[] = []

  displayRole(data: any) {
    this.roles.push(data)
  }

  clearRoles() {
    this.roles = []
  }

  onViewAllRoleSubmit() {
    this.adminService.callGetApi("api/serviceapirole/view/all").subscribe(data => {
      console.log(data)

      this.clearRoles()
      for (let i of data.record) {
        this.displayRole(i)
      }
      
    })
  }

  viewRoleByRolenameForm = this.fb.group({
    rolename: ""
  })

  onViewRoleByRolenameFormSubmit() {

    let body = this.viewRoleByRolenameForm.value
    console.log(body)
    this.adminService.callApi("api/serviceapirole/view/byrolename", body).subscribe(data => {
      console.log(data)

      this.clearRoles()
      for (let i of data.record) {
        this.displayRole(i)
      }
      
    })
  }
}
