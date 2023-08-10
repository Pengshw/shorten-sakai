import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) { }
  
  

  registerUserForm = this.fb.group({
    serviceapiid: "",
    serviceapiname: "",
    serviceapipassword: "",
    secretkey: "",
    serviceapirole: "",
    activestatus: "1"
  })



  onUserRegisterSubmit() {
    let body = this.registerUserForm.value
    this.adminService.registerUser(body).subscribe(data => {
      if (data.code == "AP000") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'User has been registered'
        });
      }  else if (data.code === "AT000") {
        this.messageService.add({
          severity: 'error',
          summary: 'Sessoin Expired',
          detail: 'Please log in again'
        });
      } 
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There is an error in registration'
        });
      }

    })
  }
  
}
