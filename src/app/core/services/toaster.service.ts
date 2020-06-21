import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private toastController: ToastController) { }
  showToast(msg = '', duration = 0, animated = true, showCloseButton = false, closeButtonText = 'OK', for_which: string = '', cssClass: string = 'my-toast') {
    if (for_which == 'ok_cancel_btn') {
      console.log('for_which', for_which)
      this.toastController.create({
        message: msg,
        duration: duration,
        animated: animated,
        // showCloseButton: showCloseButton,
        // closeButtonText: closeButtonText,
        cssClass: "my-toast",
        position: "top",
        buttons: [
          {
            side: 'end',
            //icon: 'star',
            text: 'OK',
            handler: () => {
              console.log('OK clicked');
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]

      }).then((obj) => {
        obj.present();
      });
    }
    else {
      this.toastController.create({
        message: msg,
        duration: duration,
        animated: animated,
        //showCloseButton: showCloseButton,
        //closeButtonText: closeButtonText,
        cssClass: cssClass,
        position: "top"
      }).then((obj) => {
        obj.present();
      });
    }
  }
}