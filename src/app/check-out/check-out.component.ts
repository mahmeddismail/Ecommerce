import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  constructor(private _CartService: CartService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getID()
  }
  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('01[0125][0-9]{8}')]),
    city: new FormControl(null, [Validators.required])
  })

  isLoading: boolean = false
  id: any


  getID() {
    this._ActivatedRoute.paramMap.subscribe(
      (params) => { this.id = params.get('_id') })
  }

  userOnlinePayment() {
    this.isLoading = true;
    const userData = this.shippingAddress.value

    this._CartService.onlinePayment(this.id, userData).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.navigateToPay(res.session.url)
        console.log(res.session.url)
      }
      ,
      error: (err) => {
        console.log(err)
        this.isLoading = false;
      },

      complete: () => console.log("completed CheckingOut")
    })

  }

  navigateToPay(url: string) {
    window.location.href = url
  }




}
