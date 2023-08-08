import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-url-overlay',
  templateUrl: './url-overlay.component.html',
  styleUrls: ['./url-overlay.component.css']
})
export class UrlOverlayComponent {
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  data: string = "";


  ngOnInit() {
    
    this.data = JSON.stringify(this.config.data.url);
  }
}
