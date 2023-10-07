import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductDetails } from '../interface/product-details';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WishListService } from '../wish-list.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService, private _CartService: CartService
    , private _WishListService: WishListService, private _ToastrService: ToastrService) { }
  myDetailedProduct: ProductDetails | null = null;
  productId: any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id')
      console.log(this.productId);
    })

    this._ProductsService.getProductsDetails(this.productId).subscribe({
      next: (res) => {
        this.myDetailedProduct = res.data
        console.log(this.myDetailedProduct);
      }
    })

  }

  addToCart(pId: string) {
    this._CartService.addingToCart(pId).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
          this._CartService.cartNumOfItems.next(res.numOfCartItems)
        }
        console.log(res);
      },
      error: (err) => console.log(err)

    })

  }
  addToWishList(pId: string) {
    this._WishListService.addProductToWishList(pId).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
        }
        console.log(res);
      },
      error: (err) => console.log(err)

    })

  }








  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left text-white"></i>', '<i class="fa-solid fa-arrow-right text-white"></i>'],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 1500,
    autoplayHoverPause: true

  }

}
