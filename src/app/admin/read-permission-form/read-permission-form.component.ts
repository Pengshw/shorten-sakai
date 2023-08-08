import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/service';
import { MessageService } from 'primeng/api';
import { IUserItem } from 'src/app/interface';

@Component({
  selector: 'app-read-permission-form',
  templateUrl: './read-permission-form.component.html',
  styleUrls: ['./read-permission-form.component.scss']
})
export class ReadPermissionFormComponent {

  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) {}


  permissions: any[] = []

  displayPermission(data:any ) {
    this.permissions.push(data)
  }

  clearPermissions() {
    this.permissions = []
  }
  

  onViewAllPermissionSubmit() {
    this.adminService.callGetApi("api/serviceapiaccesspermission/view/all").subscribe(data => {
      this.permissions = []
      for (let i of data.record) {
        this.displayPermission(i)
      }
    })
  }

  viewPermissionRoleForm = this.fb.group({
    role: ""
  })

  onViewPermissionRoleFormSubmit() {
    let body = this.viewPermissionRoleForm.value

    this.adminService.callApi("api/serviceapiaccesspermission/view/byrole", body).subscribe(data => {

      this.permissions = []
      for (let i of data.record) {
        this.displayPermission(i)
      }
      
    })
  }
}
