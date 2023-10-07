import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor(private _OrdersService: OrdersService) { }

  ngOnInit(): void {
    this.getAllOrders()

  }


  getAllOrders() {
    this._OrdersService.getAllOrders().subscribe({
      next: (res: any) => {
        console.log(res.data)
      }
      ,
      error: (err) => {
        console.log(err)
      },

      complete: () => console.log("completed all orders")
    })
  }
}
