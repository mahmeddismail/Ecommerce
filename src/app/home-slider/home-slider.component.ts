import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})


export class HomeSliderComponent {
  
   imageHomeSlider=[
     "assets/images/slider3.jpeg",
     "assets/images/slider-2.jpeg",
     "assets/images/slider1.jpeg",
   ]
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['',''],
    responsive: {
      0: {
        items: 1
      }
      
    },
    nav: true,
    autoplay:true,
    autoplaySpeed:3000,
    autoplayTimeout: 3500,
    autoplayHoverPause:true

  }


}