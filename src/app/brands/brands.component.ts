import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';
import { brands } from '../interface/brands';
import { SpecificBrand } from '../interface/SpecificBrand';

declare var window: any;
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) { }
  myBrands: brands[] = []
  specificBrand: any={ }
formModal: any
ngOnInit(): void {
  this._BrandsService.getAllBrands().subscribe({
    next: (res) => {
      this.myBrands = res.data
      console.log(this.myBrands);
    },
    error: (e) => console.log(e)

  })
    // //////////////////////////////////////////////////////
    this.formModal = new window.bootstrap.Modal(
    document.getElementById('exampleModal')
  )
}



/////////////////////////////////
openModal() {
  this.formModal.show()
}
closeModal() {
  this.formModal.hide()
}
//////////////////////////////////////


getSpecificBrandFromBrands(prouctId: string) {
  this._BrandsService.getSpecificBrands(prouctId).subscribe({
    next: (res) => {
      this.specificBrand = res.data
      console.log(this.specificBrand);
      this.openModal();
    },
    error: (e) => console.log(e)

  })
}
}
