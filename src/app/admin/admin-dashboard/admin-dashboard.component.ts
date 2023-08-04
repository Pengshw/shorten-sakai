import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { MessageService } from 'primeng/api';
import { IUserItem } from 'src/app/interfaces.interface';
import { MenuItem } from "primeng/api";


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})


export class AdminDashboardComponent  {
  value: string = '';
  
  items: MenuItem[] = [
    { label: "Register", icon: "pi pi-user-plus" },
    { label: "Update", icon: "pi pi-user-edit"},
    { label: "Delete", icon: "pi pi-trash" },
    { label: "View", icon: "pi pi-search" }
    
  ];
  activeItem: string = "Register"


  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) { }
  
  onActiveItemChange(e:MenuItem) {
    console.log("e: ", e)
    this.activeItem = e.label as string
  }

  registerBrowserUserForm = this.fb.group({
    username: "",
    password: "",
    role: "",
    activeStatus: ""
  })

  onBrowserUserRegisterSubmit = () => {
    console.log(this.registerBrowserUserForm.value)
    const body = this.registerBrowserUserForm.value
    this.adminService.callApi("register", body).subscribe(data => {
      console.log(data)
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

  registerUserForm = this.fb.group({
    serviceapiid: "",
    serviceapiname: "",
    serviceapipassword: "",
    secretkey: "",
    serviceapirole: "",
    activestatus: ""
  })



  onUserRegisterSubmit() {
    let body = this.registerUserForm.value
    console.log(body)
    this.adminService.registerUser(body).subscribe(data => {
      console.log("data: ", data)
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

  updateActiveStatusForm = this.fb.group({
    serviceapiid: "",
    activestatus: ""
  })

  onUpdateActiveStatusFormSubmit() {
    let body = this.updateActiveStatusForm.value
    this.adminService.updateActivateStatus(body).subscribe(data => {
      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Active status has been updated'
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

  updateRoleForm = this.fb.group({
    serviceapiid: "",
    role: ""
  })


  onUpdateRoleFormSubmit() {
    let body = this.updateRoleForm.value
    this.adminService.updateRole(body).subscribe(data => {
      console.log(data)
      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Role has been updated'
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

  deleteItemForm = this.fb.group({
    serviceapiid: ""
  })

  onDeleteItemFormSubmit() {
    let body = this.deleteItemForm.value
    console.log(body)
    this.adminService.callApi("api/serviceapi/delete/item", body).subscribe(data => {
      console.log(data)
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

  updateUserForm = this.fb.group({
    serviceapiid: "",
    serviceapiname: "",
    role: "",
    activestatus: ""
  })

  onUpdateUserFormSubmit() {
    let body = this.updateUserForm.value
    console.log(body)
    this.adminService.callApi("api/serviceapi/update/item", body).subscribe(data => {
      console.log(data)
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

  createAccessPermisionForm = this.fb.group({
    path: "",
    role: "",
    rolearray: ""
  })




  onCreateAccessPermisionFormSubmit() {
    let body = this.createAccessPermisionForm.value
    body.rolearray = `[${body.role}]`
    console.log(body)
    this.adminService.callApi("api/serviceapiaccesspermission/create/new", body).subscribe(data => {
      console.log(data)
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

  permissions: any[] = []

  displayPermission(data:any ) {
    this.permissions.push(data)
  }

  clearPermissions() {
    this.permissions = []
  }
  

  onViewAllPermissionSubmit() {
    this.adminService.callGetApi("api/serviceapiaccesspermission/view/all").subscribe(data => {
      console.log(data)
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
      console.log(data)

      this.permissions = []
      for (let i of data.record) {
        this.displayPermission(i)
      }
      
    })
  }

  createRoleForm = this.fb.group({
    rolename: ""
  })

  onCreateRoleFormSubmit() {
    let body = this.createRoleForm.value

    this.adminService.callApi("api/serviceapirole/create/new", body).subscribe(data => {
      console.log(data)
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

    console.log("body: ",  body)
    this.adminService.callApi("api/serviceapirole/update/item", body).subscribe(data => {
      console.log(data)
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