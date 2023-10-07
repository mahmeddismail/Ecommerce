import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _CartService: CartService) { }
  isLoggedIn: boolean = false;

  numberOfCartItems: number = 88
  ngOnInit(): void {
    this._CartService.cartNumOfItems.subscribe({
      next: (val) => { this.numberOfCartItems = val }
    })

    
    this._AuthService.userToken.subscribe({
      next: () => {
        if (this._AuthService.userToken.getValue() !== null) {
          this.isLoggedIn = true;

        }
        else {
          this.isLoggedIn = false;
        }
      },
    })

  }

  logOutNav() {
    this._AuthService.logOut()
  }
}
