import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSearchModalPage } from './product-search-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductSearchModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSearchModalPageRoutingModule {}
