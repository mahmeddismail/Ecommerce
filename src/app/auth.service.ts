import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router'


@Injectable({ providedIn: 'root' })

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.decodedUserToken()
    }

  }

  baseURL: string = 'https://ecommerce.routemisr.com'

  register(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signup`, userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signin`, userData);
  }

  logOut() {
    this.userToken.next(null);
    localStorage.removeItem('userToken')
    this._Router.navigate(['/login'])
  }

  decodedUserToken() {
    let encodedToken: any = localStorage.getItem('userToken')
    let decodedToken: any = jwtDecode(encodedToken)
    this.userToken.next(decodedToken)
    console.log(this.userToken);

  }


  forgetPassword(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/forgotPasswords`,userData);
  }

  verifyResetCode(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/verifyResetCode`, userData);
  }


  resetPassword(userData: object): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/api/v1/auth/resetPassword`, userData);
  }



}
