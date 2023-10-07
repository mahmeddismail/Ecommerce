import { Pipe, PipeTransform } from '@angular/core';
import { Products } from './interface/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(productsName: Products[] , term: string): Products[] {
    return productsName.filter((product) => product.title.toLowerCase().includes(term.toLowerCase()));
  }
}