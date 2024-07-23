import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Product, ProductCategoryName } from 'src/app/models/product.model';
import { RemoveProduct } from 'src/app/state/actions';
import { ProductState } from 'src/app/state/reducer';
import { CartPageComponent } from './cart-page.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let store: Store<ProductState>;

  const mockCart: Cart = {
    products: [
      { id: 1, productName: 'Apple', netPrice: 1.00, quantity: 2, isImported: true, category: ProductCategoryName.Food, taxAmount: 0.05, selectedQuantity: 2 },
      { id: 2, productName: 'Apple', netPrice: 1.00, quantity: 2, isImported: false, category: ProductCategoryName.Food, taxAmount: 0.00, selectedQuantity: 2 }
    ],

    taxesAmount: 0.10,
    netAmount: 4.10
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartPageComponent],
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule,
        CommonModule
      ],
      providers: [
        { provide: Store, useValue: jasmine.createSpyObj('Store', ['dispatch', 'select']) }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    (store.select as jasmine.Spy).and.returnValue(of(mockCart));

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch RemoveProduct action when remove is called', () => {
    const product: Product = { id: 1, productName: 'Apple', netPrice: 1.00, quantity: 2, isImported: true, category: ProductCategoryName.Food, taxAmount: 0.05 };
    component.remove(product);
    expect(store.dispatch).toHaveBeenCalledWith(RemoveProduct({ id: product.id }));
  });

  it('should display products in the table', () => {
    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('.product-list-table tbody tr');
    expect(rows.length).toBe(mockCart.products.length);

    const firstRow = rows[0];
    expect(firstRow.cells[0].textContent).toContain('1');
    expect(firstRow.cells[1].textContent).toContain('2');
    expect(firstRow.cells[2].textContent).toContain('€0.05');
    expect(firstRow.cells[3].textContent).toContain('€1.00');
    expect(firstRow.cells[4].textContent).toContain('€1.05');
  });

  it('should display total amounts', () => {
    const compiled = fixture.nativeElement;
    const totalTaxes = compiled.querySelector('.total-amounts-table td:nth-child(2)');
    const totalTTC = compiled.querySelector('.total-amounts-table tr:last-child td:nth-child(2)');

    expect(totalTaxes.textContent).toContain('€0.10');
    expect(totalTTC.textContent).toContain('€4.10');
  });

  it('should display "Panier vide" when there are no products', () => {
    (store.select as jasmine.Spy).and.returnValue(of({ products: [] }));
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const emptyCartMessage = compiled.querySelector('.empty-cart');
    expect(emptyCartMessage.textContent).toContain('Panier vide');
  });
});
