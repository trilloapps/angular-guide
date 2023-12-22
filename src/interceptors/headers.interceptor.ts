import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  // constructor(private oSessionService:cSessionService){}
  oRequestWithHeaders  : any;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
    let oHeaders = 
    {
      'Accept':'*/*',
      'x-app-name':'main',
      'content-type':'application/json',
      // 'Authorization':'Bearer ' + this.oSessionService.SessionService_GetAccessToken(),
    }
    if((request.url.includes('ajaxLogin')))
       {
         this.oRequestWithHeaders  = request.clone({ setHeaders: {
          'Accept':'*/*',
          'x-app-name':'filesharing',
          // 'x-org-name': environment.OrgName,
          'content-type':'application/json',
         } });
       }
       else
       {
         this.oRequestWithHeaders  = request.clone({ setHeaders: oHeaders });
       }
        return next.handle(this.oRequestWithHeaders)
    .pipe(retry(0), catchError((error: HttpErrorResponse)=> {
      let errorMessage: any;
      if(error.error instanceof ErrorEvent){
        //client side error
        errorMessage = `Error: ${error.error.message}`;
      }
      else
      {
        //server side error
        // errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        errorMessage = error.error.message
      }
      return throwError(() => new Error(errorMessage))
    }))
  }
}
