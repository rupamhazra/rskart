import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LayoutsPage } from './layouts.page';

describe('LayoutsPage', () => {
  let component: LayoutsPage;
  let fixture: ComponentFixture<LayoutsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
