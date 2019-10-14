import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SwiperComponent } from "ngx-swiper-wrapper";
import { SuperTabs } from "ionic2-super-tabs";
import { PanicDetailPage } from "../panic-detail/panic-detail";


/**
 * Generated class for the PanicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-panic',
  templateUrl: 'panic.html',
})
export class PanicPage {
  headerMiddleWidth: number = 0;


  hhh: string;

  page = PanicDetailPage;
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  @ViewChild('headerSwiper') headerSwiper: SwiperComponent;
  swiperConf: any = {
    slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 6,
    initialSlide: 4,
  };

  panicTimes: any = [
    {
      name: '15点',
      subName: '昨天',
      id: 3
    },
    {
      name: '19点',
      subName: '昨天',
      id: 4
    },
    {
      name: '21点',
      subName: '昨天',
      id: 5
    },
    {
      name: '0点',
      subName: '今天',
      id: 6
    },
    {
      name: '10点',
      subName: '今天',
      id: 7
    },
    {
      name: '15点',
      subName: '今天',
      id: 8
    },
    {
      name: '19点',
      subName: '今天',
      id: 9
    },
    {
      name: '21点',
      subName: '今天',
      id: 10
    },
    {
      name: '0点',
      subName: '明天',
      id: 11
    },
    {
      name: '10点',
      subName: '明天',
      id: 12
    },
    {
      name: '15点',
      subName: '明天',
      id: 13
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hhh = `calc(100% - ${window.innerWidth * 100 / 375 + 50}px)`;

  }


  ionViewDidLoad() {

    // this.headerSwiper.indexChange(() => {
    //   console.log('');
    // });

    this.headerMiddleWidth = (window.innerWidth - 24) / 5;

    console.log('ionViewDidLoad PanicPage', this.headerSwiper.directiveRef);
  }

  selectHeader(selected) {
    console.log(selected);
    this.headerSwiper.directiveRef.setIndex(selected);
    this.superTabs.slideTo(selected);
  }

  onTabSelect($event) {
    this.headerSwiper.directiveRef.setIndex($event.index);
  }

  onIndexChange(index) {
    this.superTabs.slideTo(index);
  }

}
