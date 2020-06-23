import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  dark = false;
  constructor(
    private storage: Storage,
  ) {
	this.storage.get('dark').then((val)=>{
		console.log('val',val,typeof(val))
		if(val == true)
			this.dark = true
	});
  }

  ngOnInit() {

  }

  updateDarkMode() {
    document.body.classList.toggle('dark', this.dark);
    this.storage.set('dark', this.dark);
  }

}
