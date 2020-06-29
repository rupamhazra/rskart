import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductWishlistPage } from './product-wishlist.page';

describe('ProductWishlistPage', () => {
  let component: ProductWishlistPage;
  let fixture: ComponentFixture<ProductWishlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWishlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductWishlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
