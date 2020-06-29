import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsPageModule)
  },
  {
    path: 'product-search-modal',
    loadChildren: () => import('./product-search-modal/product-search-modal.module').then(m => m.ProductSearchModalPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListPageModule)
  },
  {
    path: 'product-single/:id',
    loadChildren: () => import('./product-single/product-single.module').then(m => m.ProductSinglePageModule)
  },
  {
    path: 'product-wishlist',
    loadChildren: () => import('./product-wishlist/product-wishlist.module').then( m => m.ProductWishlistPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule { }
