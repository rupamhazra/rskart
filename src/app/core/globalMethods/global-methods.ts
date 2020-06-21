import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from "@angular/router";
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { CanActivate } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    authState = new BehaviorSubject(false);
    constructor(
        private router: Router,
        private storage: Storage,
        private platform: Platform,
        public toastController: ToastController
    ) {
        this.platform.ready().then(() => {
            this.ifLoggedIn();
        });
    }
    ifLoggedIn() {
        this.storage.get('USER_INFO').then((response) => {
            if (response) {
                this.authState.next(true);
            }
        });
    }
    login(loginDetails: any = '') {
        return this.storage.set('USER_INFO', loginDetails).then(() => {
            this.authState.next(true);
        });
    }
    logout() {
        return this.storage.remove('USER_INFO').then(() => {
            this.storage.remove('popup_msg');
            this.storage.remove('user_details');
            this.authState.next(false);
        });
    }
    isAuthenticated() {
        return this.authState.value;
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        public authenticationService: AuthenticationService
    ) { }

    canActivate(): boolean {
        return this.authenticationService.isAuthenticated();
    }

}

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
                cssClass: cssClass,
                position: "top"
            }).then((obj) => {
                obj.present();
            });
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    isLoading = false;
    constructor(public loadingController: LoadingController) { }
    present(duration: any = '', showBackdrop: boolean = true) {
        this.isLoading = true;
        return this.loadingController.create({
            // message: '<ion-img src="/assets/svg/loader-cs.svg" alt="loading..." no-padding></ion-img>Please wait..',
            message: 'Please wait..',
            translucent: true,
            cssClass: 'cs-custom-loading',
            showBackdrop: true,
            spinner: 'crescent',
            duration: duration,
            backdropDismiss: false
        }).then(a => {
            a.present().then(() => {
                //console.log('presented');
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }
    dismiss() {
        this.isLoading = false;
        return this.loadingController.dismiss();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    dataReturned: any;
    constructor(
        public modalController: ModalController
    ) { }

    async openModal(page_name, modalData, cssClass = '') {
        //console.log('modalData',modalData)
        const modal = await this.modalController.create({
            component: page_name,
            componentProps: modalData,
            animated: true,
            cssClass: cssClass,
            backdropDismiss: false
        });

        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                this.dataReturned = dataReturned.data;
                //alert('Modal Sent Data :'+ dataReturned.data);
            }
        });

        return await modal.present();
    }

    async closeModal() {
        const onClosedData: string = "Wrapped Up!";
        await this.modalController.dismiss(onClosedData);
    }
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(
        public alertController: AlertController,
        private authenticationService: AuthenticationService,
        private menuCtrl: MenuController,
        private router: Router,
    ) { }

    async presentAlert(message, header = 'Info', subHeader = '', button_text = 'Retry') {
        const alert = await this.alertController.create({
            header: header,
            subHeader: subHeader,
            message: message,
            buttons: [button_text],
            backdropDismiss: false,
            animated: true,


        });

        await alert.present();
    }

    async presentAlertMultipleButtons() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: ['Cancel', 'Open Modal', 'Delete']
        });

        await alert.present();
    }

    async presentAlertConfirm(message, type: any = '') {
        const alert = await this.alertController.create({
            //header: 'Confirm!',
            message: message,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'alert-cancel-button',
                    handler: (blah) => {
                        if (type == 'logout')
                            this.alertResponseForLogout(false);

                    }
                }, {
                    text: 'Yes',
                    cssClass: 'alert-ok-button',
                    handler: () => {
                        if (type == 'logout')
                            this.alertResponseForLogout(true);
                        // if (type = "exit")
                        //   navigator['app'].exitApp();
                        if (type == 'gohome')
                            this.router.navigateByUrl('/home');
                    }
                }
            ]
        });
        await alert.present();
    }
    alertResponseForLogout(response) {
        if (response) {
            this.menuCtrl.enable(false);
            this.authenticationService.logout();
        }

    }
    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            header: 'Prompt!',
            inputs: [
                {
                    name: 'name1',
                    type: 'text',
                    placeholder: 'Placeholder 1'
                },
                {
                    name: 'name2',
                    type: 'text',
                    id: 'name2-id',
                    value: 'hello',
                    placeholder: 'Placeholder 2'
                },
                {
                    name: 'name3',
                    value: 'http://ionicframework.com',
                    type: 'url',
                    placeholder: 'Favorite site ever'
                },
                // input date with min & max
                {
                    name: 'name4',
                    type: 'date',
                    min: '2017-03-01',
                    max: '2018-01-12'
                },
                // input date without min nor max
                {
                    name: 'name5',
                    type: 'date'
                },
                {
                    name: 'name6',
                    type: 'number',
                    min: -5,
                    max: 10
                },
                {
                    name: 'name7',
                    type: 'number'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        console.log('Confirm Ok');
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentAlertRadio() {
        const alert = await this.alertController.create({
            header: 'Radio',
            inputs: [
                {
                    name: 'radio1',
                    type: 'radio',
                    label: 'Radio 1',
                    value: 'value1',
                    checked: true
                },
                {
                    name: 'radio2',
                    type: 'radio',
                    label: 'Radio 2',
                    value: 'value2'
                },
                {
                    name: 'radio3',
                    type: 'radio',
                    label: 'Radio 3',
                    value: 'value3'
                },
                {
                    name: 'radio4',
                    type: 'radio',
                    label: 'Radio 4',
                    value: 'value4'
                },
                {
                    name: 'radio5',
                    type: 'radio',
                    label: 'Radio 5',
                    value: 'value5'
                },
                {
                    name: 'radio6',
                    type: 'radio',
                    label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
                    value: 'value6'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        console.log('Confirm Ok');
                    }
                }
            ]
        });

        await alert.present();
    }

}

@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    public onlineOffline: boolean = navigator.onLine;
    constructor(
        private alertService: AlertService,
        private loadingService: LoadingService,
    ) { }

    // watch network for a disconnection
    checkNetworkDisconnect() {
        if (!navigator.onLine) {
            this.alertService.presentAlert("Please check your internet connection!!");
            this.loadingService.dismiss();
            return true;
        } else {
            return false;
        }

    }
}

@Injectable({
    providedIn: 'root'
})
export class GetRouteMap {
    constructor() { }

}


