import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { WishListService } from '../wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../interface/products';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _CartService: CartService
    , private _WishListService: WishListService, private _ToastrService: ToastrService) { }
  searchTerm: string = ''
  allProducts: Products[] = [];
  resposneWishList: any
  myResponsiveData: [] = [] //myData from res (color) 
  myLatestWishListIds: string[] = []


  ngOnInit(): void {


    this.getallProducts()
    this.getloggedInWishList()

  }

  getallProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.data
        console.log(this.allProducts);
      },
      error: (err) => {
        console.log(err)
        console.log(err);
      },
      complete: () => {
        console.log("COMPLETED")

      }
    })

  }
  addToCart(productId: string) {
    this._CartService.addingToCart(productId).subscribe({
      next: (res) => {
        this.resposneWishList = res
        console.log(this.resposneWishList)
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
          this._CartService.cartNumOfItems.next(res.numOfCartItems)
        }
      },
      error: (err) => console.log(err),
      complete: () => console.log("Completed Adding to Cart")
    })
  }


  addToWishList(productId: string) {
    this._WishListService.addProductToWishList(productId).subscribe({
      next: (res) => {
        // console.log(productId)
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
          this.myResponsiveData = res.data
          this.myLatestWishListIds=res.data
          console.log(this.myResponsiveData);

        }

      },
      error: (err) => console.log(err),
      complete: () => {
        console.log("Completed Adding to wish List")
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

  getloggedInWishList() {
    this._WishListService.getLoggedInUserWishList().subscribe({
      next: (res) => {
        this.myLatestWishListIds = res.data.map((wishList: any) => wishList.id);
        console.log(this.myLatestWishListIds);

      },
      error: (err) => console.log(err),
    })
  }
}
