import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { ProductTypePipe } from './product-type.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductTypePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    DecimalPipe,
    RouterModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductsModule { }
