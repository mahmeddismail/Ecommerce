import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Categories } from '../interface/categories';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../category.service';
import { subCategories } from '../interface/subcategories';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _CategoryService: CategoryService, private _Router: Router) { }
  myCategories: Categories[] = []
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next: (res) => {
        this.myCategories = res.data
        console.log(this.myCategories);
      }
      , error: (err: any) => { console.log(err); }
      , complete: () => {
        console.log("Completed Categories");
      }
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
        items: 2
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: true,
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayTimeout: 2500,
    autoplayHoverPause: true

  }

}
