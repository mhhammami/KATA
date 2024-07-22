import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Product, ProductCategoryName } from 'src/app/models/product.model';
import { AddProduct, RemoveProduct } from 'src/app/state/actions';
import { ProductState } from 'src/app/state/reducer';
import { SelectAvailableProducts, SelectCartProductCount, SelectCategoryNames } from 'src/app/state/selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private readonly store: Store<ProductState>) { }

  category: ProductCategoryName | null = null;

  $products: Observable<Product[]>;
  $orderedProductsCount: Observable<number>;
  $categories: Observable<(ProductCategoryName | null)[]>;

  ngOnInit(): void {
    this.$products = this.store.select(SelectAvailableProducts);
    this.$orderedProductsCount = this.store.select(SelectCartProductCount);
    this.$categories = this.store.select(SelectCategoryNames).pipe(map((categories) => [null, ...categories]));
  }

  add(product: Product, quantity: number) {
    this.store.dispatch(AddProduct({ product, quantity }));
  }
}
