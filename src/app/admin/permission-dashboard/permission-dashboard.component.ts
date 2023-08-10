import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-permission-dashboard',
  templateUrl: './permission-dashboard.component.html',
  styleUrls: ['./permission-dashboard.component.scss']
})
export class PermissionDashboardComponent implements OnInit {
  items: MenuItem[] = [
    { label: "Create", icon: "pi pi-user-plus" },
    { label: "Update", icon: "pi pi-user-edit"},
    { label: "Read", icon: "pi pi-search" },
  ];
  activeItem: MenuItem = {}


  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.activeItem = this.items[0]
  }
  
  onActiveItemChange(e:MenuItem) {
    this.activeItem = e 
  }

  createAccessPermisionForm = this.fb.group({
    path: "",
    role: "",
    rolearray: ""
  })




  onCreateAccessPermisionFormSubmit() {
    let body = this.createAccessPermisionForm.value
    body.rolearray = `[${body.role}]`
    this.adminService.callApi("api/serviceapiaccesspermission/create/new", body).subscribe(data => {
      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Access has been created'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There is an error in creating'
        });
      }
    })
  }

  createRoleForm = this.fb.group({
    rolename: ""
  })

  onCreateRoleFormSubmit() {
    let body = this.createRoleForm.value

    this.adminService.callApi("api/serviceapirole/create/new", body).subscribe(data => {
      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Access has been updated'
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

  updateAccessPermisionForm = this.fb.group({
    path: "",
    role: "",
    rolearray: ""
  })

  onUpdateAccessPermisionFormSubmit() {
    let body = this.updateAccessPermisionForm.value
    body.rolearray = `[${body.role}]`

    this.adminService.callApi("api/serviceapiaccesspermission/update/item", body).subscribe(data => {

      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Access has been updated'
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

  updateRoleItemForm = this.fb.group({
    roleid: "",
    rolename: ""
  })

  onUpdateRoleItemFormSubmit() {
    let body = this.updateRoleItemForm.value

    this.adminService.callApi("api/serviceapirole/update/item", body).subscribe(data => {

      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Role name has been updated'
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
}
