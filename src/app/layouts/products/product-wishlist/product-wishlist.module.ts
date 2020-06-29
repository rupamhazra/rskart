import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductWishlistPageRoutingModule } from './product-wishlist-routing.module';

import { ProductWishlistPage } from './product-wishlist.page';
import { ComponentsModule } from "../../../core/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductWishlistPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductWishlistPage]
})
export class ProductWishlistPageModule { }
