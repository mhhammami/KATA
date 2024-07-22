import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CartPageComponent } from './cart/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    title: 'Product Detail'
  },
  {
    path: 'cart',
    component: CartPageComponent,
    title: 'Cart Page'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
