import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutsPage } from './layouts.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutsPage,
    children: [
      {
        path: '',
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'my-account',
        loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsPageModule)
      },
      {
        path: 'product-category',
        loadChildren: () => import('./product-category/product-category.module').then(m => m.ProductCategoryPageModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutPageModule)
      },
      {
        path: 'search-products',
        loadChildren: () => import('./products/product-search-modal/product-search-modal.module').then(m => m.ProductSearchModalPageModule)
      },
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutsPageRoutingModule { }
