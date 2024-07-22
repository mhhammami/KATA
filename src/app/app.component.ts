import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from './state/reducer';
import { GetProductCategories } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kata-hammami';

  constructor(private readonly store: Store<ProductState>) {
    store.dispatch(GetProductCategories())
  }
}
