import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductSinglePageRoutingModule } from './product-single-routing.module';

import { ProductSinglePage } from './product-single.page';
import { ComponentsModule } from "../../../core/components/components.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductSinglePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductSinglePage]
})
export class ProductSinglePageModule { }
