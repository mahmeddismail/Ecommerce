import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from './interface/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  [x: string]: any;
  cartNumOfItems: BehaviorSubject<number> = new BehaviorSubject(0)
  myCart: Cart[] = []
  constructor(private _HttpClient: HttpClient) {
    this.getLoggedInUserCart().subscribe({
      next: (res) => {
        this.myCart = res
        this.cartNumOfItems.next(res.numOfCartItems)
      },
      error: (err) => console.log(err),
    })


  }
  BaseUrl: string = "https://ecommerce.routemisr.com"

  ngOnInit(): void {

  }


  headers: {} = {
    token: localStorage.getItem('userToken')
  }

  addingToCart(product_id: string): Observable<any> {

    return this._HttpClient.post(`${this.BaseUrl}/api/v1/cart`,
      { productId: product_id }, { headers: this.headers })
  }
  getLoggedInUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/cart`, { headers: this.headers })
  }
  removeSpecificCartItem(product_id: string): Observable<any> {
    return this._HttpClient.delete(`${this.BaseUrl}/api/v1/cart/${product_id}`, { headers: this.headers })
  }

  updateQTYCount(myCount: number, product_id: string): Observable<any> {
    return this._HttpClient.put(`${this.BaseUrl}/api/v1/cart/${product_id}`
      , { count: myCount }, { headers: this.headers })
  }


  clearAllCart(): Observable<any> {
    return this._HttpClient.delete(`${this.BaseUrl}/api/v1/cart`, { headers: this.headers })
  }

  onlinePayment(cartId: string, form: any): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, {shippingAddress: form},
        { headers: this.headers })
  }

 



}
