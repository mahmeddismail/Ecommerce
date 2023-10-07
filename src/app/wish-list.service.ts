import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _HttpClient: HttpClient) { }

  BaseUrl: string = "https://ecommerce.routemisr.com"
  headers: {} = {
    token: localStorage.getItem('userToken')
  }
  addProductToWishList(product_id: string): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/wishlist`
      , { productId: product_id }, { headers: this.headers })

  }

  getLoggedInUserWishList(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/wishlist`,{ headers: this.headers })

  }


  removingItemFromWishList(product_id: string): Observable<any> {
    return this._HttpClient.delete(`${this.BaseUrl}/api/v1/wishlist/${product_id}`,{ headers: this.headers })
  }


}
