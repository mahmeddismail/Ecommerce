import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../interface/cart';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService, public _ToastrService: ToastrService) {}
  userCart: Cart | null = null
  ngOnInit(): void {
    this.getLoggedUserCart()
  }

  getLoggedUserCart() {

    this._CartService.getLoggedInUserCart().subscribe({
      next: (res) => {
        this.userCart = res
        console.log(this.userCart)
        this._CartService.cartNumOfItems.next(res.numOfCartItems)
      },
      error: (err) => console.log(err),
      complete: () => console.log("COMPLETED LoggedInUserCart")
    })

  }

  removingItemFromCart(productId: string) {
    this._CartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        this.userCart = res
        console.log(this.userCart)
        if (res.status == 'success') {
          this._ToastrService.success("The Item has been removed successfully!");
          this._CartService.cartNumOfItems.next(res.numOfCartItems)
        }

        if (res.numOfCartItems == 0) {
          this.clearMyWholeCart()
        }

      },
      error: (err) => console.log(err),
      complete: () => console.log("COMPLETED Removing Item")
    })
  }


  updatingCountQTY(myCartCount: number, product_id: string, i: number) {  //+ AND -
    this._CartService.updateQTYCount(myCartCount, product_id).subscribe({
      next: (res) => {
        this.userCart = res
        console.log(this.userCart);
        // if (this.userCart?.data.products[i].count == 0) {
        //   this.removingItemFromCart(product_id)
        // }
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log("updating cart COMPLETED");

      }
    })
  }

  clearMyWholeCart() {
    this._CartService.clearAllCart().subscribe({

      next: (res) => {
        this.userCart = null
        console.log(this.userCart);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  addItemMsg() {

    this._ToastrService.success("You've added an item!");
  }

  removeItemMsg() {
    this._ToastrService.success("You've removed an item!");
  }




}


