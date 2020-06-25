import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  appPages = [];
  profile_img = '';
  name = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
  ) {
    this.initializeApp();
    this.storage.get('dark').then((val) => {
      //console.log('dark', val)
      if (val != '' && val == true)
        document.body.classList.toggle('dark', true);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getMenu();
    });
  }

  getMenu() {
    this.appPages = [
      {
        title: 'Shop',
        url: 'home/shop',
        icon: 'basket',
        chileMenu: []
      },
      {
        title: 'My Account',
        url: 'home/my-account',
        icon: 'person-circle',
        chileMenu: []
      },
      {
        title: 'Settings',
        url: 'settings',
        icon: 'settings',
        chileMenu: []
      },
      {
        title: 'My Wallet',
        url: 'products',
        icon: 'wallet',
        chileMenu: []
      },
      {
        title: 'Categories',
        url: 'product-category',
        icon: 'settings',
        chileMenu: []
      },
      {
        title: 'My Cart',
        url: 'home/cart',
        icon: 'cart',
        chileMenu: []
      },
      {
        title: 'My WishList',
        url: 'home/cart',
        icon: 'heart',
        chileMenu: []
      },

    ];

  }



}
