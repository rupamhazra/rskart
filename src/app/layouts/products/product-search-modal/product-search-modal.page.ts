import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ProductService } from '../../../core/services/product.service';
import { ToasterService, ModalService } from '../../../core/globalMethods/global-methods';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search-modal',
  templateUrl: './product-search-modal.page.html',
  styleUrls: ['./product-search-modal.page.scss'],
})
export class ProductSearchModalPage implements OnInit {

  @ViewChild('input') myInput;
  result: any;
  item_s: any;
  isItemAvailable: boolean = false;
  search_items: any = ["Ram", "gopi", "dravid"];
  search_placeholder: string = "Enter product name";
  search_address = '';
  progress_bar: boolean = false;
  autocompleteItems = [];
  isNoItemAvailable: boolean;
  showList: boolean = false;
  mediaUrl = environment.imageURL;
  constructor(
    public modalService: ModalService,
    private speechRecognition: SpeechRecognition,
    private productService: ProductService,
    private toasterService: ToasterService,
    private router: Router,
  ) {
    this.autocompleteItems = [];
  }

  ngOnInit() {
    /**
     * For pointer focus on input field
     */
    // setTimeout(() => {
    //   this.myInput.setFocus();
    // }, 150);
    // this.readProducts()
  }
  // readProducts() {
  //   //this.loadingService.present();
  //   //this.categories =[];
  //   this.productService.readProducts().subscribe(
  //     res => {
  //       this.result = res.result;
  //       //this.result_slide = res.result;
  //       //console.log("result",this.result);
  //       //this.loadingService.dismiss();
  //       //console.log("afterrrrrrrrrrrr");

  //     },
  //     error => {
  //       console.log("error::::" + error);
  //       //this.loadingService.dismiss();

  //       this.toasterService.showToast(error.error.msg, 2000)

  //     }
  //   )
  // }


  getItems(ev: any, item_val: any) {
    // set val to the value of the searchbar
    var val;
    if (item_val != '') {
      val = item_val;
      console.log('val', val)
      //this.modalService.closeModal();
      //this.router.navigateByUrl('/products/product-list');
    }
    else {
      val = ev.target.value;
    }

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      console.log('val', val)
      console.log('this.result', this.result)
      this.search_items = this.result
      // this.search_items = this.result.filter((item) => {
      //   console.log('item.name', item.name)
      //   return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
      console.log('this.search_items', this.search_items)
    }
  }
  searchProduct(item) {
    console.log('item', item)
    this.modalService.closeModal()
    this.router.navigateByUrl('/products/product-single/' + item.id);

  }
  start() {
    console.log('sdsdsdsdds')
    this.isItemAvailable = true;
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          //console.log('matches', matches)
          return this.getItems('', matches[0])

          //return this.router.navigateByUrl('/home');
          //console.log('after', this.search_items)
        },
        (onerror) => console.log('error:', onerror)

      )
  }

  startListing() {
    this.speechRecognition.startListening().subscribe((speeches) => {
      console.log('speeches', speeches)
      //this.updateSearchResults(speeches, which_type_search, true)
      this.search_address = speeches[0];
    }, (err) => {
      alert(JSON.stringify(err));
    })
  }

  updateSearchResults(ev: any, voice = false) {
    this.isItemAvailable = false
    this.isNoItemAvailable = false;
    var val = ''
    if (voice) {
      val = ev;
    } else {
      val = ev.target.value;
    }
    if (val == '') {
      this.autocompleteItems = [];
      return;
    }
    console.log('this.autocomplete.input', val);
    this.autocompleteItems = [];
    this.showList = true;
    this.getDropLocations(val);

  }
  getDropLocations(val) {
    let request_data = {};
    this.productService.searchProducts(val).subscribe(
      res => {
        //console.log('res.result', res.result.length)
        this.autocompleteItems = res.result;
        this.progress_bar = false;
        if (this.autocompleteItems.length == 0)
          this.isNoItemAvailable = true;
        //}
      },
      error => {
        //console.log("error::::" + error.error.msg);
        this.progress_bar = false;
        //this.toasterService.showToast(error.error.msg, 2000)
      }
    );
    //this.autocompleteItems.push({ 'description': 'test ..' });

  }
  selectSearchLocation(location: any) {
    // console.log('type', type);
    // if (type == 'pickup') {
    //   this.showList = false;
    //   this.search_address = location;
    //   let geocoder = new google.maps.Geocoder();
    //   geocoder.geocode({ 'address': location }, (results, status) => {
    //     this.loadMap(results[0].geometry.location.lat(), results[0].geometry.location.lng());
    //   });
    // }
    // else {
    //   this.storage.get('select_location').then((val) => {
    //     if (val != null) {
    //       let val1 = val;
    //       val1['drop_location'] = location;
    //       this.storage.set('select_location', val1);
    //     }
    //   });
    //   this.router.navigateByUrl('office-pool-car-service');
    // }

  }

}
