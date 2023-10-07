import { Component } from '@angular/core';
import { Categories } from '../interface/categories';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css']
})
export class MainSliderComponent {

  constructor(private _ProductsService: ProductsService) { }
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
    navText: ['', ''],
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

