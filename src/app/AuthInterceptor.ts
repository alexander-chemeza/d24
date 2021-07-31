import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RestapiService} from './restapi.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private service: RestapiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['login']);
        }
      }));
  }
}
