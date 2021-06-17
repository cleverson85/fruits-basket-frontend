import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from './enum/token.enum';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(Token.Key);
    if (token) {
      const cloned = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
