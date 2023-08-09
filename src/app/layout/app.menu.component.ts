import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../auth/auth.service';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private authService: AuthService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Shorten Link', icon: 'pi pi-link',  routerLink: ['/urlpanel'] },
                    { label: 'Logout', icon: 'pi pi pi-sign-out', command: () =>  this.authService.logout()},
                ]
            }
        ]
        if (this.authService.isAdmin) {
            this.model.push(
            {
                label: 'Admin',
                items: [
                    { label: 'ServiceAPI',
                    icon: 'pi pi-fw pi-pencil',
                    routerLink: ['/admin'] },
                    { label: 'User',
                    icon: 'pi pi-fw pi-pencil',
                    routerLink: ['/admin'] },
                    { label: 'Permissions',
                    icon: 'pi pi-fw pi-pencil',
                    routerLink: ['/admin'] },
                ]
            })
        }
    }
}

