import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { SeeMorePipe } from './see-more.pipe';
import { SearchPipe } from './search.pipe';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { WishListComponent } from './wish-list/wish-list.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { ProductsComponent } from './products/products.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './loading.interceptor';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NotfoundComponent,
    RegisterComponent,
    ProductDetailsComponent,
    HomeSliderComponent,
    SeeMorePipe,
    SearchPipe,
    CartComponent,
    WishListComponent,
    MainSliderComponent,
    ProductsComponent,
    LoadingComponent,
    CategoryDetailsComponent,
    CheckOutComponent,
    MyOrdersComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AddHeaderInterceptor,
    //   multi: true
    // }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
