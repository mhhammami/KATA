import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() product: Product;
  @Output() add = new EventEmitter<number>();

  quantity = 1;

  doAdd() {
    if (this.product.quantity) {
      this.add.emit(this.quantity);
    }
  }
}
