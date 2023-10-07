import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  constructor(private _LoadingService: LoadingService) { }

  myLoading: boolean = false;
  
  ngOnInit(): void {
    this._LoadingService.isLoading.subscribe({
      next:(res)=>{
        if(res===true){
          this.myLoading=true
        }
        else{
          this.myLoading=false

        }
      }
    })
  }

}
