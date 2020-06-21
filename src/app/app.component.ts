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
        title: 'Home',
        url: 'home',
        icon: './assets/svg/home.svg',
        chileMenu: []
      },
      {
        title: 'My Account',
        url: 'my-account',
        icon: './assets/svg/user1.svg',
        chileMenu: []
      },
      {
        title: 'Settings',
        url: 'settings',
        icon: './assets/svg/user1.svg',
        chileMenu: []
      },

    ];

  }
  getTab() {
    this.tabs = [
      {
        title: 'Home',
        url: 'home',
        icon: './assets/svg/home.svg',
        chileMenu: []
      },
      {
        title: 'My Account',
        url: 'my-account',
        icon: './assets/svg/user1.svg',
        chileMenu: []
      },
    ];

  }

}
