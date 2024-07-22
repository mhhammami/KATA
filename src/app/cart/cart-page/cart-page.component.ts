import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { RemoveProduct } from 'src/app/state/actions';
import { ProductState } from 'src/app/state/reducer';
import { SelectCart } from 'src/app/state/selectors';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  constructor(private readonly store: Store<ProductState>) { }

  $cart: Observable<Cart>;

  ngOnInit(): void {
    this.$cart = this.store.select(SelectCart);
  }

  remove(product: Product) {
    this.store.dispatch(RemoveProduct({ id: product.id }));
  }
}
