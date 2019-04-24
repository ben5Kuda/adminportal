import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, shareReplay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
errorEvents: any;
    constructor(private router: Router, private oauthService: OAuthService, public snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storage_token: string = localStorage.getItem('access_token');
    const token: string = this.oauthService.getAccessToken(); // .getItem('access_token');

    //   if (this.oauthService.hasValidAccessToken() === false) {
    //         this.oauthService.logOut();
    //   }

    if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    if (request.method === 'GET') {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
           if (event.status === 200) {
            this.router.navigate(['success']);
               console.log('Success');
            } else {
                console.log('Oops!!! something went wrong');
            }
        }
      }), catchError(this.handleError<any>())
    );
  }
private handleError<T> (operation = 'operation', result?: T) {
   // let response = error as HttpErrorResponse
    return (error: any): Observable<T> => {
        if (error.status === 401) {
            this.oauthService.initImplicitFlow();
        } else if (error.status === 409) {
            this.showError('Duplicates are not allowed');
        } else if (error.status === 400) {
           this.showError(error.message);
        } else {
            this.router.navigate(['error']);
        }

      console.log(operation + ' failed:' + error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  showError(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = ['snackBar-fail'];
    // The second parameter is the text in the button.
    // In the third, we send in the css class for the snack bar.
    this.snackBar.open(message, 'X', config);
  }

 showSuccess(message: string): void {
    this.snackBar.open(message);
  }
}
