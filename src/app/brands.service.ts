import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient: HttpClient) { }

  BaseUrl: string = "https://ecommerce.routemisr.com"


  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/brands`)
  }
  getSpecificBrands(pId: string): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/brands/${pId}`)
  }

}
