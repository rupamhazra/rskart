import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Events } from '@ionic/angular';
//import { Storage } from '@ionic/storage';
// import { Network } from '@ionic-native/network/ngx';
// import { AlertService, ToasterService } from '../../globalMethods/global-methods';
// import { OfficePoolCarService } from '../../../core/services/office-pool-car.service';
//import { Firebase } from "@ionic-native/firebase/ngx";
import { Storage } from '@ionic/storage';
import { ModalService } from '../../globalMethods/global-methods';
import { ProductSearchModalPage } from '../../../layouts/products/product-search-modal/product-search-modal.page';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  product_count_on_cart: number;
  menu_button_visible: boolean;
  cart_button_visible: boolean;
  title_section_visible: boolean;
  back_button_visible: boolean = false;
  logout_visible: boolean = true;
  title: any = 'RSKart';
  network_msg: string = '';
  network_check_class: string = '';
  network_check_class_show: boolean = false;
  referral_balance: string;
  referral_bal_show: boolean = false;
  notification_show: boolean = false;
  notification_count = 0;
  sos_button: boolean = false;
  back_button_visible_click = false;
  search_section_visible: boolean;
  userId = '';
  constructor(
    private router: Router,
    // public header_event: Events,
    private storage: Storage,
    public modalService: ModalService,
    // private alertService: AlertService,
    // private network: Network,
    // private officePoolCarService: OfficePoolCarService,
    // private toasterService: ToasterService,
    //private fcm: Firebase,

  ) {

  }
  ngOnInit() {
    console.log("current Link", this.router.url);
    if (this.router.url.includes('register')) {
      this.menu_button_visible = false;
      this.title_section_visible = true;
      this.cart_button_visible = false;
      this.back_button_visible_click = false;
    }
    if (this.router.url.includes('login')) {
      this.menu_button_visible = false;
      this.title_section_visible = true;
      this.cart_button_visible = false;
      this.back_button_visible = false;
    }
    if (this.router.url.includes('forgot-password')) {
      this.menu_button_visible = false;
      this.title_section_visible = true;
      this.cart_button_visible = false;
      this.title = "Reset Password";
      this.back_button_visible = true;
      this.back_button_visible_click = false;
    }
    if (this.router.url.includes('shop')) {

      this.menu_button_visible = true;
      this.title_section_visible = true;
      this.cart_button_visible = true;
      this.notification_show = true;
      this.search_section_visible = true
    }
    if (this.router.url.includes('cart')) {
      this.cart_button_visible = false;
      this.menu_button_visible = false;
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "My Cart";
    }
    if (this.router.url.includes('product-category')) {
      this.cart_button_visible = true;
      this.menu_button_visible = true;
      this.title_section_visible = true;
      this.title = "Shop By Category";
    }
    if (this.router.url.includes('product-single')) {
      this.cart_button_visible = true;
      this.menu_button_visible = false;
      this.title_section_visible = false;
      this.back_button_visible = true;
      //this.title = "My Categories";
    }
    if (this.router.url.includes('product-list')) {
      this.cart_button_visible = true;
      this.menu_button_visible = false;
      this.title_section_visible = true;
      this.title = "Product List";
    }
    if (this.router.url.includes('settings')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "App settings";
    }
    if (this.router.url.includes('product-wishlist')) {
      this.cart_button_visible = true;
      this.menu_button_visible = true;
      this.title_section_visible = true;
      this.title = "My Wishlist";
    }
    if (this.router.url.includes('bus-route-details')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Bus-Route List";
    }
    if (this.router.url.includes('seat-layout-details')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Seat Layout";
    }
    if (this.router.url.includes('booked-details')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Confirm Booking Details";
    }
    if (this.router.url.includes('payment-details')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Payment Options";
    }
    if (this.router.url.includes('booking-thankyou')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Confirm Booking";
    }
    if (this.router.url.includes('common-page/contact-us')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Contact Us";
      this.back_button_visible_click = false;
    }
    if (this.router.url.includes('common-page/privacy-policy')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Privacy Policy";
      this.back_button_visible_click = false;
    }
    if (this.router.url.includes('common-page/terms-condition')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Terms and Conditions";
      this.back_button_visible_click = false;
    }
    if (this.router.url.includes('common-page/popup-details')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Details";

    }
    if (this.router.url.includes('my-account')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "My Account";
    }
    if (this.router.url.includes('wallet')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "My Wallet";
    }
    if (this.router.url.includes('myaccount/myaccount-common-page/refer-earn')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Refer & Earn";
      this.referral_bal_show = true;
    }
    if (this.router.url.includes('myaccount/myaccount-common-page/notifications')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Notifications";

    }
    if (this.router.url.includes('myaccount/myaccount-common-page/route-map')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Route Map";
    }
    if (this.router.url.includes('booking-history')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "My Rides";
    }
    if (this.router.url.includes('booking-history-details')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "My Ride";
    }
    if (this.router.url.includes('location-tracking')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Tracking";
    }
    if (this.router.url.includes('today-rides')) {
      this.back_button_visible = true;
      this.title_section_visible = true;
      this.title = "Today's Rides";
    }

  }
  getBalance(userId) {
    let request_data = { "type": 'referral_balance', "user_id": userId, }
    // this.officePoolCarService.payThroughWalletService(request_data).subscribe(
    //   res => {
    //     this.referral_balance = res.result.referral_balance;
    //   },
    //   error => {
    //     //this.toasterService.showToast(error.error.msg, 2000);
    //   }
    // );
  }
  logoutUser() {
    //this.alertService.presentAlertConfirm("Are you sure you want to end this session?", "logout");
  }
  goToPage(page) {
    if (page == 'notifications') {
      this.router.navigateByUrl('myaccount/myaccount-common-page/notifications');
    }
    //this.router.navigateByUrl('myaccount/myaccount-common-page/notifications')
  }
  back() {
    //this.getNotificationCount(this.userId);
    this.router.navigateByUrl('/home');
  }
  openCartPage() {
    //console.log('opencartPage');
    this.router.navigateByUrl('/cart');
  }
  openSearchModal() {
    this.router.navigateByUrl('search-products');
  }

}
