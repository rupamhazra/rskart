import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { SliderService } from '../../core/services/slider.service';
import { environment } from 'src/environments/environment';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ModalService, ToasterService, LoadingService } from '../../core/globalMethods/global-methods';

@Component({
  selector: 'app-home',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss', '../layouts.page.scss'],
})
export class ShopPage implements OnInit {
  color: string = 'green';
  name: any;
  title: any;
  medie_url: any = environment.imageURL
  visibleKey: boolean = false;
  result: [];
  result_cat: [];
  result_slide: [];
  progress_bar: boolean = false;
  // slideOpts = {
  //   initialSlide: 1,
  //   speed: 400,
  //   autoplay: true
  // };
  slideOpts1 = {
    initialSlide: 1,
    speed: 200,
    slidesPerView: 5,

  };
  constructor(
    private storage: Storage,
    private router: Router,
    public loadingService: LoadingService,
    private productService: ProductService,
    private toasterService: ToasterService,
    private sliderService: SliderService,
    private speechRecognition: SpeechRecognition,
    public modalService: ModalService,

  ) { }
  ngOnInit() {
    //console.log('this.router.url', this.router.url);
    this.title = this.router.url;
    this.storage.get('USER_INFO').then((val) => {
      if (val) this.name = val.name
    });
    //this.loadingService.present();
    //this.readSliders();
    //this.progress_bar = true;
    this.readCategories();
    this.readProducts();
    //this.loadingService.dismiss();
  }
  doRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      this.readProducts();
      this.readCategories();
      event.target.complete();
    }, 1500);
  }
  readSliders() {
    this.loadingService.present();
    //this.categories =[];
    this.sliderService.readSliders().subscribe(
      res => {
        //this.result = res.result;
        this.result_slide = res.result;
        //console.log("result_slide",this.result_slide);
        this.loadingService.dismiss();
        //console.log("afterrrrrrrrrrrr");
        this.visibleKey = true;
      },
      error => {
        console.log("error::::" + error);
        this.loadingService.dismiss();
        this.visibleKey = true;
        this.toasterService.showToast(error.error.msg, 2000)

      }
    )
  }
  readCategories() {

    //this.categories =[];
    this.progress_bar = true;
    this.productService.readCategories().subscribe(
      res => {
        this.result_cat = res.result;
        //console.log("result_cat",this.result_cat);
        // this.loadingService.dismiss();
        //console.log("afterrrrrrrrrrrr");
        this.visibleKey = true;
        this.progress_bar = false;
      },
      error => {
        console.log("error::::" + error);
        //this.loadingService.dismiss();
        this.progress_bar = false;
        this.visibleKey = true;
        this.toasterService.showToast(error.error.msg, 2000);

      }
    )
  }
  readProducts() {
    this.progress_bar = true;
    let request_data = {};
    this.productService.readProducts(request_data, 10, 1).subscribe(
      res => {
        //console.log('res.result', res.result.length)
        this.result = res.result;
        this.visibleKey = true;
        this.progress_bar = false;
        //}
      },
      error => {
        //console.log("error::::" + error.error.msg);
        this.progress_bar = false;
        this.toasterService.showToast(error.error.msg, 2000)
      }
    );
  }
  getProduct(id) {
    //console.log('id====',id)
    this.router.navigateByUrl('products/product-single/' + id);
  }
}
