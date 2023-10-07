import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class authenGuard implements CanActivate {
  constructor(private _Router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      this._Router.navigate(['/login']);
      return false;
    }
  }
}
