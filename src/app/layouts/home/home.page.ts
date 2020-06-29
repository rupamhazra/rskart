import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tabs = [];
  constructor() { }

  ngOnInit() {
    this.getTab();
  }
  getTab() {
    this.tabs = [
      {
        title: 'Shop',
        url: 'shop',
        icon: 'basket',
        chileMenu: []
      },
      {
        title: 'My Account',
        url: 'my-account',
        icon: 'person-circle',
        chileMenu: []
      },
      {
        title: 'My Cart',
        url: 'cart',
        icon: 'cart',
        chileMenu: []
      },
      {
        title: 'My WishList',
        url: 'product-wishlist',
        icon: 'heart',
        chileMenu: []
      },
    ];

  }

}
