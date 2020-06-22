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
  tabs = [];
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
      console.log('dark', val)
      if (val != '' && val == true)
        document.body.classList.toggle('dark', true);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getMenu();
      this.getTab();

    });
  }

  getMenu() {
    this.appPages = [
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
      {
        title: 'Settings',
        url: 'settings',
        icon: 'settings-outline',
        chileMenu: []
      },

    ];

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
