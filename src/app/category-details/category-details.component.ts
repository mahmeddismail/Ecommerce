import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../category.service';
import { specficCategory } from '../interface/specficCategory';
import { subCategories } from '../interface/subcategories';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  constructor(private _CategoryService: CategoryService, private _ActivatedRoute: ActivatedRoute) { }

  subCategories: boolean = false
  specificCategory: any={}
  subCategory: subCategories[] = []
  myCategoryId: string | null = null


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((param) => {
        this.myCategoryId = param.get('_id')
        console.log(this.myCategoryId);
        
      }
    )
    this.GetSpecificCategory(this.myCategoryId)
    this.getSpecificSubCategory(this.myCategoryId)
  }

  GetSpecificCategory(productsId: any) {
    this._CategoryService.GetSpecificCategory(productsId).subscribe({
      next: (res) => {
        this.specificCategory = res.data
        console.log(this.specificCategory)
        this.subCategories = true
      },
      error: (err) => console.log(err)


    })
  }

  getSpecificSubCategory(productsId: any) {
    this._CategoryService.GetAllSubCategoriesOnCategory(productsId).subscribe({
      next: (res) => {
        this.subCategory = res.data
        console.log(this.subCategory)
        this.subCategories = true

      },
      error: (err) => console.log(err)
    })
  }

}
