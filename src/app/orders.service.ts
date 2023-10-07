import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { }
  BaseUrl: string = "https://ecommerce.routemisr.com"



  headers: {} = {
    token: localStorage.getItem('userToken')
  }
  getAllOrders(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/orders/`)
  }
}
