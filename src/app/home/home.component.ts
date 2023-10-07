import { Component, ElementRef, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../interface/products';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../wish-list.service';
import { CategoryService } from '../category.service';
import { Categories } from '../interface/categories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private _ToastrService: ToastrService
    , private _WishListService: WishListService, private _CategoryService: CategoryService) {}
  searchTerm: string = ''
  allProducts: Products[] = []
  RecentAddedToCart: any
  myRecentAddedToWIshList: [] = []
  isInMyWishList: boolean = false
  myLatestWishListIds: string[] = []
  // myCategories: Categories[] = []

  ngOnInit(): void {
    this.getHomeProducts()
    this.getloggedInWishList()
  }


  getHomeProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.data
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log("COMPLETED all products")

      }
    })
  }
  // 
  // 
  // 
  // 
  // 


  getloggedInWishList() {
    this._WishListService.getLoggedInUserWishList().subscribe({
      next: (res) => {
        this.myLatestWishListIds = res.data.map((wishList: any) => wishList.id);
        // console.log(this.myLatestWishListIds);
      },
      error: (err) => console.log(err),
      // complete: () => console.log("My loggedIn User WishList")
    })
  }

  addToCart(productId: string) {
    this._CartService.addingToCart(productId).subscribe({
      next: (res) => {
        this.RecentAddedToCart = res
        console.log(this.RecentAddedToCart)
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
          this._CartService.cartNumOfItems.next(res.numOfCartItems)
        }
      },
      error: (err) => console.log(err),
      // complete: () => console.log("Completed Adding to Cart")
    })
  }


  addToWishList(productId: string, i: number) {
    this._WishListService.addProductToWishList(productId).subscribe({
      next: (res) => {
        // console.log(productId)
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
          this.myRecentAddedToWIshList = res.data
          this.myLatestWishListIds = res.data
          // console.log(this.myRecentAddedToWIshList);

        }
      },
      error: (err) => console.log(err),
      complete: () => {
        // console.log("Completed Adding to wish List")
      }
    })
  }


  removeFromWishList(pId: string) {
    this._WishListService.removingItemFromWishList(pId).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
          this.myLatestWishListIds = res.data
          // console.log(this.myLatestWishListIds);

        }
      },
      error: (err) => console.log(err),
      complete: () => {
        // console.log("Completed Removing to wish List")
      }
    })
  }
}











