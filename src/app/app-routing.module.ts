import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

import { UrlformComponent } from './dashboard/urlform/urlform.component';
import { AnalyticDashboardComponent } from './analytic/analytic-dashboard/analytic-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { authGuard } from './auth/auth.guard';
import { authAdminGuard } from './auth/auth-admin.guard';
import { UserAdminDashboardComponent } from './admin/user-admin-dashboard/user-admin-dashboard.component';
import { PermissionDashboardComponent } from './admin/permission-dashboard/permission-dashboard.component';

const routes: Routes = [
     
    { path: "login", component: LoginComponent},
    
    { path: '', component: AppLayoutComponent,
        children: [
            { path: '', component: AnalyticDashboardComponent, canActivate:[authGuard]},
            { path: 'urlpanel', component: UrlformComponent, canActivate:[authGuard] },
            { path: "admin", component: AdminDashboardComponent, canActivate:[authAdminGuard]  },
            { path: "admin/userform", component: UserAdminDashboardComponent, canActivate:[authAdminGuard]},
            { path: "admin/permissionform", component: PermissionDashboardComponent, canActivate:[authAdminGuard]}
        ]
    },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
  
  ];



@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

