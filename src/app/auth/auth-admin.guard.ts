import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
 
  if (!cookieService.check("jwt") || !cookieService.get("isAdmin")) {
    router.navigate(["/analytic"]);
    return false
  }
  return true
};
