import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ProductDetailComponent } from './product-detail.component';
import { Product, ProductCategoryName } from 'src/app/models/product.model';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const mockProduct: Product = {
    id: 1,
    productName: 'Test Product',
    category: ProductCategoryName.Food,
    netPrice: 100,
    quantity: 10,
    taxAmount: 20,
    isImported: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.product-card__title').textContent).toContain(mockProduct.productName);
    expect(compiled.querySelector('.product-card__description').textContent).toContain(mockProduct.category);
    expect(compiled.querySelector('.product-card__price').textContent).toContain('€100.00');
  });

  it('should emit add event with correct quantity when doAdd is called and product quantity is sufficient', () => {
    spyOn(component.add, 'emit');

    component.quantity = 3; // Quantity to add
    component.product.quantity = 10; // Product quantity

    component.doAdd();

    expect(component.add.emit).toHaveBeenCalledWith(3);
  });

  it('should not emit add event when quantity to add is greater than product quantity', () => {
    spyOn(component.add, 'emit');

    component.quantity = 12; // Quantity to add
    component.product.quantity = 10; // Product quantity

    component.doAdd();

    expect(component.add.emit).not.toHaveBeenCalled();
  });

  it('should not emit add event when product quantity is 0', () => {
    spyOn(component.add, 'emit');

    component.product.quantity = 0; // Set product quantity to 0
    component.quantity = 3; // Quantity to add

    component.doAdd();

    expect(component.add.emit).not.toHaveBeenCalled();
  });

  it('should display "Non disponible" when product quantity is 0', () => {
    component.product.quantity = 0;
    fixture.detectChanges();

    const notAvailableSpan = fixture.debugElement.query(By.css('.product-not-available')).nativeElement;

    expect(notAvailableSpan).toBeTruthy();
  });

});
