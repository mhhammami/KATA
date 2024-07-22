import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService {

  public apply(products: Product[], categories: ProductCategory[]): Product[] {
    return products.map((product) => ({
      ...product,
      taxAmount: this._getOneProductTax(product, categories)
    }));
  }

  private _getOneProductTax(product: Product, categories: ProductCategory[]): number {
    const category = categories.find(({ name }) => name === product.category);
    if (!category) {
      return 0;
    }
    const taxRate = (category.tax + (product.isImported ? 0.05 : 0));
    return this._roundToNearestFiveCents(product.netPrice * taxRate);
  }

  private _roundToNearestFiveCents(amount: number): number {
    // Multiplying by 20, rounding to the nearest integer, then dividing by 20
    return Math.ceil(amount * 20) / 20;
  }
}
