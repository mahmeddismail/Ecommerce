import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authenGuard } from './authen.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ProductsComponent } from './products/products.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authenGuard], component: HomeComponent },
  { path: 'about', canActivate: [authenGuard], component: AboutComponent },
  { path: 'categories', canActivate: [authenGuard], component: CategoriesComponent },
  { path: 'categories/:_id/subcategories', canActivate: [authenGuard], component: CategoryDetailsComponent },
  { path: 'cart', canActivate: [authenGuard], component: CartComponent },
  { path: 'allorders', canActivate: [authenGuard], component: MyOrdersComponent },
  { path: 'wishList', canActivate: [authenGuard], component: WishListComponent },
  { path: 'brands', canActivate: [authenGuard], component: BrandsComponent },
  { path: 'checkOut/:_id', canActivate: [authenGuard], component: CheckOutComponent },
  { path: 'products', canActivate: [authenGuard], component: ProductsComponent },
  { path: 'productDetails/:id', canActivate: [authenGuard], component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetPassword', loadComponent: () => import('./reset-password/reset-password.component').then(mod => mod.ResetPasswordComponent) },
  { path: 'forgetPassword', loadComponent: () => import('./forget-password/forget-password.component').then(mod => mod.ForgetPasswordComponent) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(mod => mod.ProfileComponent) },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
