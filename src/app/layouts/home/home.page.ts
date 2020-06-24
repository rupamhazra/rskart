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
        icon: 'basket-outline',
        chileMenu: []
      },
      {
        title: 'My Account',
        url: 'my-account',
        icon: 'person-circle-outline',
        chileMenu: []
      },
    ];

  }

}
