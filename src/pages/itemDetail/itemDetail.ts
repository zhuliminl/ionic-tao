import { Component, NgZone, ViewChild } from '@angular/core';
import { AlertController, App, Content, NavController, NavParams, PopoverController, Slides } from 'ionic-angular';
import { Api } from "../../app/api";
import { RightTopPopover } from "../../popovers/rightTop/rightTop";
import { SharePopover } from "../../popovers/share/share";
import { StatusBar } from "@ionic-native/status-bar";
import { StreamingMedia, StreamingVideoOptions } from "@ionic-native/streaming-media";
import { LocalStorageAsync } from "../../app/localStorageAsync";
import * as CryptoJS from 'crypto-js';
import { ReportPage } from "../report/report";

@Component({
  selector: 'page-item-detail',
  templateUrl: 'itemDetail.html'
})
export class ItemDetailPage {
  item: any = {};
  showBack: boolean = true;
  slideHeight: number = 375;
  images: any = [];
  detailImages: any = [];
  headerOpacity: number = 0;
  showDetailImages: boolean = false;
  moreItems: any = [];
  itemImageWidth: number = 0;
  showGoToTop: boolean = false;
  endTime: any = [];
  newUrl: string;
  highCouponLoading: boolean = true;


  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    protected localStorage: LocalStorageAsync,
    public navParams: NavParams,
    public api: Api,
    private alertCtrl: AlertController,
    public zone: NgZone,
    public popoverCtrl: PopoverController,
    private statusBar: StatusBar,
    private streamingMedia: StreamingMedia,
    private app: App) {
    this.item = this.navParams.get('item');
    this.slideHeight = window.innerWidth;
    this.itemImageWidth = (window.innerWidth / 2) - 3;
    if (this.item.taobao_image) {

      this.images = this.item.taobao_image.split(',');
    }
  }




  async ionViewDidLoad() {

    //this.content.contentBottom = 46;

    if (!this.item['activityid']) {
      this.item['activityid'] = this.item.couponurl.split('&activityId=')[1].split('&')[0];
    }
    const base = 'https://uland.taobao.com/coupon/edetail?tj1=1&tj2=1&activityId=';

    this.newUrl = base + this.item.activityid + '&itemId=' + this.item.itemid + `&pid=${this.api.pid}&nowake=1`;
    console.log(this.newUrl);

    const resp: any = await this.api.getTaobaoDetail(this.item.itemid);
    if (resp.data && resp.data['images'] && resp.data['images'].length > 0) {
      this.detailImages = resp.data['images'];
    }
    // const url = `http://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?data={"item_num_id":"${this.item.itemid}"}`;
    // const resp = await this.api.getAsync(url, true);
    // console.log(resp, this.item.itemid, url);

    this.getHighCoupon();

    await this.loadMoreItem();

    if (this.item.activity_type === '聚划算' && this.item.end_time !== '0') {
      setInterval(() => {
        this.endTime = this.getRemainTime(this.item.end_time * 1000);
      }, 100);
    }

  }

  async getHighCoupon() {
    this.highCouponLoading = true;
    const body = {
      apikey: this.api.haoDanKuKey,
      itemid: this.item.itemid,
      pid: this.api.pid,
      activityid: this.item.activityid,
      tb_name: '敏特儿',
      isForm: true
    };
    const key = CryptoJS.SHA1(JSON.stringify(body));

    let result = await localStorage.getItem(`high-coupon|${key}`);
    if (!result) {
      const resp = await this.api.postAsync('http://v2.api.haodanku.com/ratesurl/apikey/' + this.api.haoDanKuKey, body, true);

      await localStorage.setItem(`high-coupon|${key}`, resp.data.coupon_click_url);
      result = resp.data.coupon_click_url;
    }

    this.newUrl = result;

    this.highCouponLoading = false;


  }

  async ionViewDidEnter() {
    this.statusBar.styleDefault();
  }
  async ionViewWillLeave() {
    this.statusBar.styleLightContent();
  }

  async loadMoreItem() {
    const resp = await this.api.getAsync(`http://v2.api.haodanku.com/get_similar_info/apikey/${this.api.haoDanKuKey}/itemid/${this.item.itemid}`, true);
    this.moreItems = resp.data;
  }

  async goTaobao() {

    if (window['Baichuan']) {
      const Baichuan: any = window['Baichuan'];
      Baichuan.showPage({
        type: 'page',
        url: this.newUrl
      }, [{}, {
        openType: 'Native',
      }, {}], (err) => {
        console.log('success');
      }, (err) => {
        console.log(`baichuan error => ${err}`);
      });
    }
  }

  goBack() {
    this.showBack = false;
    this.navCtrl.pop({
      animation: 'ios-transition'
    });
  }

  openItem(item) {

    this.app.getRootNav().push(ItemDetailPage, { item }, {
      animation: 'ios-transition'
    });

  }

  goToTop() {
    this.showGoToTop = false;
    const wait = this.content.isScrolling ? 150 : 0;
    setTimeout(() => this.content.scrollToTop(200), wait);
  }

  onScroll($event) {
    if (!$event) return;
    this.zone.run(() => {
      if ($event.scrollTop <= this.slideHeight) {
        this.headerOpacity = $event.scrollTop / this.slideHeight;
      }
      if ($event.scrollTop > this.slideHeight) {
        this.headerOpacity = 1;
      }

      this.zone.run(() => {
        this.showGoToTop = $event.scrollTop > 500
      })

    })
  };

  getRemainTime(endTime) {
    const t = endTime - new Date().getTime();
    const millionSecond = Math.floor(t % 1000);
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const ms = (millionSecond / 100).toFixed(0);
    return [hours + days * 24, minutes, seconds, ms === '10' ? 0 : ms];
    //return `${hours + days * 24}:${minutes}:${seconds}:${ms === '10' ? 0 : ms}`;

  }

  showNoticeAlert() {
    let alert = this.alertCtrl.create({
      title: '声明',
      message: '本网站是一家中立的导购网站，网站中的商品信息均来自于互联网。如商品信息不同，可能是商品信息未及时更新引起，所有商品信息请以淘宝/天猫店铺内为准。网站提醒用户，购买商品前注意谨慎核实相关信息。如用户对商品/服务的标题 、价格、详情等任何信息有任何疑问的，请在购买前与商品所属店铺经营者沟通确认。网站存在海量商品信息，如用户发现商品中有任何违法/违规信息，请立即反馈给我们。',
      buttons: [
        {
          text: '好的',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '立即反馈',
          handler: () => {
            this.app.getRootNav().push(ReportPage, {}, {
              animation: 'ios-transition'
            });
          }
        }
      ]
    });
    alert.present();
  }

  openMore() {
    let isIphoneX = '';
    if (this.api.isIphoneX) {
      isIphoneX = ' iphone-x';
    }
    if (this.api.isIphoneOthers) {
      isIphoneX = ' iphone-others';
    }
    let popover = this.popoverCtrl.create(RightTopPopover, { parent: this }, { cssClass: `right-top${isIphoneX}` });
    popover.present();
  }

  public showShare() {
    let popover = this.popoverCtrl.create(SharePopover, { parent: this }, { cssClass: 'share' });
    popover.present();
  }

  parseF(text: string) {
    return parseFloat(text);
  }

  playVideo(videoId) {
    console.log(`http://cloud.video.taobao.com/play/u/1/p/1/e/6/t/1/${videoId}.mp4`);
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'portrait'
    };
    this.streamingMedia.playVideo(`http://cloud.video.taobao.com/play/u/1/p/1/e/6/t/1/${videoId}.mp4`, options);
  }
}
