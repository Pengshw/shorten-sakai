import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UrlOverlayComponent } from "../url-overlay/url-overlay.component";
import { MessageService } from 'primeng/api';
import { ShortlinkService } from 'src/app/service';
import { IUrlFormBody } from 'src/app/interface';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
    selector: 'app-urlform',
    templateUrl: './urlform.component.html',
    styleUrls: ['./urlform.component.css'],
    providers: [DialogService]
})
export class UrlformComponent {
    ref: DynamicDialogRef | undefined;

    urlForm = this.fb.group({
        url_link: "",
        url_backhalf: ""
    })

    backhalf:string = ""

    constructor(
        private fb: FormBuilder,
        public dialogService: DialogService,
        private messageService: MessageService,
        private shortLinkService: ShortlinkService,
        private authService: AuthService
        ) {}

    onUrlFormSubmit = () =>  {

        const body: IUrlFormBody = {
            longlink: this.urlForm.value.url_link,
            backhalf: this.urlForm.value.url_backhalf
        }
        return this.shortLinkService.getNewShortUrl(body)
    }

    handleUrlClick = (e: any) => {
        if (this.backhalf.length < 4 && this.backhalf.length > 0) {
            this.messageService.add({ 
                severity: 'error',
                summary: 'Error',
                detail: 'Backhalf has to be at least 4 characters',
                });
            return
        }
        this.onUrlFormSubmit().subscribe(resp => {
            if (resp.code === "success") {
                this.ref = this.dialogService.open(UrlOverlayComponent, {
                header: 'Your New URL', data:{
                    resp
                }
                });
            } else if (resp.code == "failure") {
                this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Backhalf is already in use',
                });
            }

        })
    }
}
