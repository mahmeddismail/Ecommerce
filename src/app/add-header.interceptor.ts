import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenHeader: any = localStorage.getItem('userToken')
    let myReq = request.clone({
      headers: request.headers.set('token', tokenHeader)
    })
    return next.handle(myReq);
  }
}
