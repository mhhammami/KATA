import { Pipe, PipeTransform } from '@angular/core';
import { Product, ProductCategoryName } from '../models/product.model';

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {

  transform(products: Product[], filter: ProductCategoryName | null): Product[] {
    if (!filter) {
      return products;
    }
    return products.filter(({ category }) => category === filter);
  }
}
