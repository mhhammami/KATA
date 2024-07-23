import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Product, ProductCategory, ProductCategoryName } from 'src/app/models/product.model';
import { AddProduct } from 'src/app/state/actions';
import { productReducer, ProductState } from 'src/app/state/reducer';
import { SelectAvailableProducts, SelectCartProductCount, SelectCategoryNames } from 'src/app/state/selectors';
import { ProductListComponent } from './product-list.component';
import { ProductsModule } from '../products.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: jasmine.SpyObj<Store<ProductState>>;

  const mockProducts: Product[] = [
    { id: 1, productName: 'Product 1', category: ProductCategoryName.Medecine, netPrice: 100, quantity: 10, taxAmount: 20, isImported: false },
    { id: 2, productName: 'Product 2', category: ProductCategoryName.Electric, netPrice: 200, quantity: 5, taxAmount: 40, isImported: false },
  ];

  const mockCategories: ProductCategory[] = [
    {
      name: ProductCategoryName.Medecine,
      "tax": 0
    },
    {
      "name": ProductCategoryName.Food,
      "tax": 0
    },
    {
      "name": ProductCategoryName.Books,
      "tax": 0.1
    },
    {
      "name": ProductCategoryName.Electric,
      "tax": 0.2
    },
    {
      "name": ProductCategoryName.Fragrance,
      "tax": 0.2
    }

  ];
  const mockProductCount = 3;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ProductsModule,
        RouterTestingModule,
        StoreModule.forRoot({ product: productReducer })
      ],
      providers: [
        { provide: Store, useValue: storeSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store<ProductState>>;

    // Configure the spy to return observables based on selectors
    store.select.and.callFake((selector: any) => {
      if (selector === SelectAvailableProducts) {
        return of(mockProducts);
      } else if (selector === SelectCartProductCount) {
        return of(mockProductCount);
      } else if (selector === SelectCategoryNames) {
        return of(mockCategories);
      } else {
        return of([]);
      }
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display categories in the select dropdown', () => {
    const options = fixture.debugElement.queryAll(By.css('select option'));
    expect(options.length).toBe(mockCategories.length + 1); // Plus un pour "All"

    const allOption = options[0].nativeElement;
    expect(allOption.textContent).toContain('All');

    mockCategories.forEach((category, index) => {
      expect(options[index + 1].nativeElement.textContent).toContain(category);
    });
  });

  it('should display product list', () => {
    const productCards = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(productCards.length).toBe(mockProducts.length);
  });

  it('should display correct product count in the cart link', () => {
    const cartLink = fixture.debugElement.query(By.css('.cart a')).nativeElement;
    expect(cartLink.textContent).toContain(mockProductCount.toString());
  });

  it('should dispatch AddProduct action when add is called', () => {
    const productToAdd = mockProducts[0];
    const quantityToAdd = 2;

    store.dispatch.calls.reset(); // Ensure dispatch spy is reset
    component.add(productToAdd, quantityToAdd);

    expect(store.dispatch).toHaveBeenCalledWith(AddProduct({ product: productToAdd, quantity: quantityToAdd }));
  });

});
