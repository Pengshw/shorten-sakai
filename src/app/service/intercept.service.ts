import { Injectable } from '@angular/core';
import {
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()

export class InterceptService  implements HttpInterceptor {

	constructor(private authService:  AuthService) { }

	// intercept request and add token
  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

	    return next.handle(request)
	    .pipe(
			tap({
				next: (event) => {
					if (event instanceof HttpResponse) {
						if (event.body.code === "AT000") this.authService.logout()	
					}
				},
				error: (error: HttpErrorResponse) => {
					console.log("----response----");
					console.error("status code:");
					console.error(error);
					console.error(error.message);
					console.log("--- end of response---");
					throw error;
				}
			})
	        
	      )

    };
  
 
}
	