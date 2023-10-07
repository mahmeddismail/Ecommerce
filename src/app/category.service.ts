import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient: HttpClient) { }
  BaseUrl: string = "https://ecommerce.routemisr.com"

 
  GetSpecificCategory(pId:string):Observable<any> {
   return this._HttpClient.get(`${this.BaseUrl}/api/v1/categories/${pId}`)
  }
  GetAllSubCategoriesOnCategory(pId:string):Observable<any> {
   return this._HttpClient.get(`${this.BaseUrl}/api/v1/categories/${pId}/subcategories`)
  }
}
