import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
//import { Events } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  qty: any = '1';
  eachProductPrice: any = 0.00
  totalPrice: any = 0.00;
  productList: any;
  selectedValue: any = "1";
  media_url: any = environment.imageURL
  products_exits_on_cart: boolean;
  constructor(
    private storage: Storage,
    //public events1: Events,
    private router: Router,
  ) {
  }

  ngOnInit() {
    //console.log('medie_url', this.media_url)
    this.getCartData();
  }
  getCartData() {
    this.storage.get('allProductDetailsInCart').then((val) => {
      //console.log('val', val)
      if (val) {
        this.products_exits_on_cart = true
        this.productList = val
        val.forEach(element => {
          // console.log('element', element.price)
          this.totalPrice = parseFloat(this.totalPrice) + (parseFloat(element.price) * element.cart_qty)
          this.eachProductPrice = element.price
        });
      } else {
        //console.log('val', val)
        this.products_exits_on_cart = false
        console.log('products_exits_on_cart', this.products_exits_on_cart)
        this.storage.remove("allProductDetailsInCart");
      }
    });
  }
  changeQty(product_id, event) {
    //this.totalPrice =  0.00
    // console.log('this', event.detail.value)
    // console.log('product_id', product_id)
    // console.log('this.productList', this.productList)
    this.productList.forEach(element => {
      if (element.id == product_id) {
        let qty = parseInt(event.detail.value) - 1;
        element['cart_qty'] = parseInt(event.detail.value);
        //element['modify_price'] = parseFloat(element.price) * parseInt(event.detail.value);
        this.totalPrice = parseFloat(this.totalPrice) + (parseFloat(element.price) * qty)

      }
    });
    this.storage.set('allProductDetailsInCart', this.productList);
  }
  removeFromCartEvent(product_id: BigInteger) {
    //console.log('this.productList.length', this.productList.length)
    //console.log('before', this.productList)
    this.productList.forEach((item, key) => {
      if (item.id == product_id) {
        this.productList.pop(item)
        //console.log('this.totalPrice', this.totalPrice)
        //console.log('remove_pricce', parseFloat(item.price) * item.cart_qty)
        this.totalPrice = parseFloat(this.totalPrice) - (parseFloat(item.price) * item.cart_qty)
        //console.log('remove_pricce', this.totalPrice)

      }
    });
    //console.log('after',this.productList)
    if (this.productList.length > 0) {
      //console.log('exist cart')
      this.storage.set("allProductDetailsInCart", this.productList);
      //this.events1.publish('showProductCountOnCart',this.productList.length);
    } else {
      //console.log('empty cart')
      this.products_exits_on_cart = false
      //console.log('products_exits_on_cart', this.products_exits_on_cart)
      this.storage.remove("allProductDetailsInCart");
    }
    //this.events1.publish('showProductCountOnCart', this.productList.length);
  }
  go_to_home() {
    this.router.navigateByUrl('/');
  }
  placeOrderEvent() {
    console.log('placeOrderEvent')
  }

}
