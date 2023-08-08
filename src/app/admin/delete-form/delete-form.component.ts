import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.scss']
})
export class DeleteFormComponent {
  constructor(private fb: FormBuilder, private adminService: AdminService, private messageService: MessageService) { }


  deleteItemForm = this.fb.group({
    serviceapiid: ""
  })

  onDeleteItemFormSubmit() {
    let body = this.deleteItemForm.value
    this.adminService.callApi("api/serviceapi/delete/item", body).subscribe(data => {
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
