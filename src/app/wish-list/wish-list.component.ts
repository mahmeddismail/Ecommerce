import { Component, OnInit } from '@angular/core';
import { WishListService } from '../wish-list.service';
import { Wishlist } from '../interface/wishlist';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { SeeMorePipe } from '../see-more.pipe';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private _WishListService: WishListService, private _CartService: CartService, private _ToastrService: ToastrService) { }
  myWishList: Wishlist | null = null

  ngOnInit(): void {

    this.getLoggedInWishList()
  }


  getLoggedInWishList() {
    this._WishListService.getLoggedInUserWishList().subscribe({
      next: (res) => {
        this.myWishList = res
        console.log(this.myWishList);
      },
      error: (err) => console.log(err),
      complete: () => console.log("My loggedIn User WishList")
    })
  }

  addToCart(productID: string) {
    this._CartService.addingToCart(productID).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
          this._CartService.cartNumOfItems.next(res.numOfCartItems)
        }
        console.log(res);
      },
      error: (err) => console.log(err),
      complete: () => console.log("Completed Adding To Cart")
    })
  }

  removeFromMyWishList(productID: string) {
    this._WishListService.removingItemFromWishList(productID).subscribe({
      next: (res) => {
        // this.myWishList = res
        console.log(res.data);
        if (res.status == 'success') {
          this._ToastrService.success("Product removed successfully from your wishlist");
          this.getLoggedInWishList()
        }
      },
      error: (err) => console.log(err),
      complete: () => console.log("Completed removing from wish list")
    })
  }
}
