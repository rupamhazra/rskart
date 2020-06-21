import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductSearchModalPageRoutingModule } from './product-search-modal-routing.module';

import { ProductSearchModalPage } from './product-search-modal.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    ProductSearchModalPageRoutingModule
  ],
  declarations: [ProductSearchModalPage]
})
export class ProductSearchModalPageModule { }
