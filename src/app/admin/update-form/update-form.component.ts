import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent {
  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) { }
  
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

  updateUserForm = this.fb.group({
    serviceapiid: "",
    serviceapiname: "",
    role: "",
    activestatus: ""
  })

  onUpdateUserFormSubmit() {
    let body = this.updateUserForm.value
    
    this.adminService.callApi("api/serviceapi/update/item", body).subscribe(data => {

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
  

}
