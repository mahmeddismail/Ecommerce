import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }
  BaseUrl:string="https://ecommerce.routemisr.com"



  getProducts(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/products`)
  }

  getProductsDetails(id: string):Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/products/${id}`)
  }


  getCategories():Observable<any>{ //Here cuz of the HomeSlider
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/categories`)
  }
  
} 
