import { Component, NgZone, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { App, Content, NavController, Slides } from 'ionic-angular';
import { Api } from "../../app/api";
import { ItemDetailPage } from "../itemDetail/itemDetail";
import { ItemsPage } from "../items/items";
import _ from 'lodash';
import { SwiperComponent } from "ngx-swiper-wrapper";
import { NineOuterPage } from '../nineOuter/nineOuter';
// import {LocalStorageAsync} from "../../app/localStorageAsync";
// import {Clipboard} from "@ionic-native/clipboard";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;
  @ViewChildren(Slides) slides: QueryList<Slides>;
  @ViewChild(SwiperComponent) headerSwiperComponent: SwiperComponent;

  defaultImage: string = 'assets/imgs/image-loading.png';

  preloadCount: number = 0;
  preSlidesloadCount: number = 4;
  itemImageWidth: number = 0;
  minId: number = 1;
  showGoToTop: boolean = false;
  subjects: any = [];
  slideHeight: number = 0;

  headerSlides: Slides;
  headerSwiper: any;
  iconItemHeight: number = 0;
  //public _:any = _;


  public items: any = [];
  public hotItems: any = [];
  public hotItemHeight: number = 0;
  public hotItemImgHeight: number = 0;
  hotSlides: Slides;
  //bad:any = [];

  headerSlidesConfig: any = {
    speed: 300,
    preloadImages: false,
    autoplay: {
      disableOnInteraction: false
    }

  };

  constructor(public navCtrl: NavController,
    public api: Api,
    public zone: NgZone,
    private app: App) {
    this.minId = 1;
    this.itemImageWidth = (window.innerWidth / 2) - 3;
    this.iconItemHeight = (window.innerWidth / 4) * 0.5 + 40;
    this.slideHeight = (window.innerWidth * 306) / 750;
  }

  getImage(url) {
    if (url.indexOf('haodanku.com') > -1) return url;
    return `${url}_250x250.jpg`
  }

  async loadData(more = false) {
    const randNav: any = [1, 2];
    const nowNav = _.sample(randNav);
    const resp: any = await this.api.getAsync(`/nav/${nowNav}/cid/0/back/10/min_id/` + this.minId);
    //const resp: any = await this.api.getAsync(`http://v2.api.haodanku.com/column/apikey/${this.api.haoDanKuKey}/type/4/back/50/min_id/${this.minId}`, true);


    // this.bad = [];
    // for(let it of resp['data']) {
    //   if (it.end_time === '0') this.bad.push(it);
    // }
    // console.log(this.bad.length, this.minId);

    this.minId = resp.min_id;
    if (more === true) {
      for (let item of resp['data']) {
        this.items.push(item);
      }

      return
    }
    this.items = resp['data'];

  }

  ionViewDidLoad() {
    this.headerSwiper = this.headerSwiperComponent.directiveRef.swiper();
    //this.loadCategories();
    // this.content.ionScroll.subscribe((data)=>{
    //   this.showGoToTop = data.scrollTop > 200;
    //   console.log('this.showGoToTop', this.showGoToTop);
    // })

  }

  ionViewDidEnter() {
    this.minId = 1;
    this.loadData();
    this.loadHot();
    this.headerSlides = this.slides.first;
    this.hotSlides = this.slides.last;
  }


  async doRefresh(refresher) {
    this.minId = 1;
    const start = Date.now();
    await this.loadData();
    await this.api.loadSubject();
    await this.loadHot();
    const ms = Date.now() - start;
    if (ms <= 800) {
      setTimeout(() => {
        refresher.complete();
      }, 800 - ms);
    } else {
      refresher.complete();
    }

  }

  goToTop() {
    this.showGoToTop = false;

    const wait = this.content.isScrolling ? 150 : 0;
    setTimeout(() => this.content.scrollToTop(200), wait);
  }

  async doInfinite() {
    this.loadData(true);
  }

  onScroll($event) {
    if ($event) {
      this.zone.run(() => {
        this.showGoToTop = $event.scrollTop > 500
      })
    }

  };

  openItem(item) {

    this.app.getRootNav().push(ItemDetailPage, { item }, {
      animation: 'ios-transition'
    });

  }

  async loadHot() {
    const randCid: any = [9, 11, 3, 4];
    const nowCid = _.sample(randCid);
    console.log('nowCid', nowCid);
    const resp = await this.api.getAsync(`http://v2.api.haodanku.com/itemlist/apikey/${this.api.haoDanKuKey}/cid/0/nav/3/cid/${nowCid}/sale_min/10000/back/20/min_id/1`, true);
    this.hotItems = resp.data;
    this.hotItemImgHeight = (window.innerWidth / 4) * 0.9;
    this.hotItemHeight = this.hotItemImgHeight + 56;
  }

  goSubject(id, name) {
    this.app.getRootNav().push(ItemsPage, {
      subjectId: id,
      hasHeader: true,
      headerTitle: name,
      isSubject: true,
      hasSort: false,
      hasMore: false
    }, {
        animation: 'ios-transition'
      });
  }

  goTodayNew() {
    this.app.getRootNav().push(ItemsPage, {
      hasHeader: true,
      headerTitle: '今日上新',
      isToadyNew: true,
      apiParams: '',
      defaultSort: '/sort/5'
    }, {
        animation: 'ios-transition'
      });
  }

  go99() {
    this.app.getRootNav().push(NineOuterPage, {}, {
      animation: 'ios-transition'
    });
  }

  goHotBrand() {
    this.app.getRootNav().push(ItemsPage, {
      hasHeader: true,
      headerTitle: '品牌爆款',
      isHotBrand: true,
      apiParams: '',
      defaultSort: '/sort/5'
    }, {
        animation: 'ios-transition'
      });
  }

  goVideo() {
    this.app.getRootNav().push(ItemsPage, {
      hasHeader: true,
      headerTitle: '视频购物',
      isVideo: true,
      apiParams: '',
      defaultSort: '/sort/5'
    }, {
        animation: 'ios-transition'
      });
  }

  goTaoQiangGou() {
    this.app.getRootNav().push(ItemsPage, {
      hasHeader: true,
      headerTitle: '淘抢购',
      isTaoQiangGou: true,
      apiParams: '',
      defaultSort: '/sort/5'
    }, {
        animation: 'ios-transition'
      });
  }


}
