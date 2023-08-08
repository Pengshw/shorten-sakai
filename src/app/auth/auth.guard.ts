import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (!cookieService.check("jwt")) {
    
    router.navigate(["/login"]);
    return false
  }
  return true
};
