import { Component } from '@angular/core';
import { AlertController, App, NavController, ToastController } from 'ionic-angular';
import { ReportPage } from "../report/report";
import { CustormerPage } from "../custormer/custormer";
import { DependentPage } from "../dependent/dependent";
import { LocalStorageAsync } from "../../app/localStorageAsync";
import { Clipboard } from "@ionic-native/clipboard";

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  headerHeight: number = 0;
  headerBgHeight: number = 0;
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App,
    private clipboard: Clipboard,
    private localStorage: LocalStorageAsync,
    private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.headerHeight = (320 * window.innerWidth) / 750;
    this.headerBgHeight = (104 * window.innerWidth) / 750;
  }

  goReport() {
    this.app.getRootNav().push(ReportPage, {}, {
      animation: 'ios-transition'
    });
  }

  checkUpdate() {
    let alert = this.alertCtrl.create({
      title: '更新',
      subTitle: '您已经是最新版了哦',
      buttons: ['确定']
    });
    alert.present();
  }

  relative() {
    this.app.getRootNav().push(CustormerPage, {}, {
      animation: 'ios-transition'
    });
  }

  dependence() {
    this.app.getRootNav().push(DependentPage, {}, {
      animation: 'ios-transition'
    });
  }

  // contact(){
  //   let alert = this.alertCtrl.create({
  //     title: '联系客服',
  //     subTitle: '请联系微信：xxxx',
  //     buttons: ['确定']
  //   });
  //   alert.present();
  // }

  goTaobaoOrder() {
    if (window['Baichuan']) {
      const Baichuan: any = window['Baichuan'];
      Baichuan.showPage({
        type: 'myOrdersPage',
        allOrder: true,
        status: 0
      }, [{}, {
        openType: 'Native',
      }, {}], () => {
        console.log('success');
      }, () => {
        console.log('error');
      });
    }
  }

  goTaobaoCart() {
    if (window['Baichuan']) {
      const Baichuan: any = window['Baichuan'];
      Baichuan.showPage({
        type: 'myCartsPage'
      }, [{}, {
        openType: 'Native',
      }, {}], () => {
        console.log('success');
      }, () => {
        console.log('error');
      });
    }
  }

  async goShareApp() {

    const result = '【省钱家】每日万款品质尖货，独家优惠券，抢到手软\n' +
      '赶快下载畅享优惠吧\n' +
      'http://www.baidu.com';
    await this.localStorage.setAsync('last-search-content', result);


    this.clipboard.copy(result);
    let toast = this.toastCtrl.create({
      message: '分享信息复制成功！',
      duration: 1500,
      position: 'middle'
    });

    toast.present();
  }


}
