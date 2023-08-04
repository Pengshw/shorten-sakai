import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) { }
  
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
}
