import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.css']
})
export class CopyButtonComponent {
  constructor(private messageService: MessageService) {}
    
    @Input() shortenUrl: string = "";
    
    handleClick(e: any) {
        navigator.clipboard.writeText(this.shortenUrl.substring(1, this.shortenUrl.length-1));
        this.messageService.add({
          severity: 'success',
          summary: 'Copied',
          detail: 'Text Copied!'
        });
        
    }
}
