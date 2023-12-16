import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {mergeMap, Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.has('Skip-Interceptor')) {
      const newRequest = req.clone({ headers: req.headers.delete('Skip-Interceptor') });
      return next.handle(newRequest);
    }
    return this.authService.getToken().pipe(
        mergeMap(token => {
          const tokenReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(tokenReq);
        })
    );
  }
}
