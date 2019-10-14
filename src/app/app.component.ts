import { Component } from '@angular/core';
import { AlertController, App, LoadingController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AppMinimize } from "@ionic-native/app-minimize";
import { Api } from "./api";
import { Clipboard } from "@ionic-native/clipboard";
import _ from 'lodash';
import { SearchAllPage } from "../pages/searchAll/searchAll";
import { LocalStorageAsync } from "./localStorageAsync";

const base_url = 'http://api.shengqianjia.tbbmn.com'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  lastContent: string = null;
  //@ViewChild('searchClipboardSwal') private searchClipboardSwal:SwalComponent;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private app: App,
    private appMinimize: AppMinimize,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private clipboard: Clipboard,
    private api: Api,
    protected localStorage: LocalStorageAsync,
    public plt: Platform) {
    platform.ready().then(() => {
      // if(window['Baichuan']){
      //   const Baichuan:any = window['Baichuan'];
      //   Baichuan.auth('login', () => {
      //     console.log('on baichuan start');
      //   }, (error) => {
      //     console.log('on baichuan error=>' + JSON.stringify(error));
      //   });
      // }


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleLightContent();
      splashScreen.hide();
      this.beforeLoad(() => {
        this.rootPage = TabsPage;
      });
      //this.rootPage = TabsPage;


      platform.registerBackButtonAction(() => {
        let name = this.app.getRootNav().getActive().name;
        if (name !== 'HomePage' && name !== 'TabsPage') {
          return this.app.getRootNav().pop({
            animation: 'ios-transition'
          });
        }
        this.appMinimize.minimize();
      });

    });
  }

  async beforeLoad(cb) {

    const loader = this.loadingCtrl.create({
      content: "正在准备数据..."
    });
    loader.present();
    if (this.plt.height() === 812 && this.plt.is('iphone')) {
      this.api.isIphoneX = true;
    } else if (this.plt.is('iphone')) {
      this.api.isIphoneOthers = true;
    }
    console.log('FIN xxxxxxxxx')
    await this.loadPid();
    await this.loadCats();
    await this.loadKeywords();
    await this.api.loadSubject();
    loader.dismiss();
    this.doPauseResumeSubs();
    setTimeout(async () => {
      await this.doClipboardSearchCheck();
      //this.showAlertSearch('【2018春季新款韩版宽松格子衬衫女长袖百搭衬衣学生chic韩范上衣】http://m.tb.cn/h.3cnGn7n 点击链接，再选择浏览器咑閞；或復·制这段描述€qa1fbaZmL4W€后到👉淘♂寳♀👈');
    }, 1000);
    cb();
  }

  doPauseResumeSubs() {
    this.plt.resume.subscribe(() => {
      setTimeout(async () => {
        await this.doClipboardSearchCheck();
        //alertCtrl
      }, 500);
    });
  }

  static parseContent(content) {
    if (content.indexOf('#手聚App团购#')) {
      console.log('!1');
      content = content.split('宝贝不错:')[1];
      console.log('!2');
      content = content.split('(分享自@')[0];
      console.log('!3');
    } else {
      if (content.indexOf('http://m.tb.cn') > -1) {
        content = content.split('http://m.tb.cn')[0];
      }

      if (content.indexOf('https://m.tb.cn') > -1) {
        content = content.split('https://m.tb.cn')[0];
      }

      if (content.indexOf('【') === 0) {
        content = content.substr(1, content.length - 1)
      }

      if (content.indexOf('】，') === content.length - 2) {
        content = content.substr(0, content.length - 3)
      }

      if (content.indexOf('】') === content.length - 1) {
        content = content.substr(0, content.length - 2)
      }
    }

    return content;
  }

  async doClipboardSearchCheck() {

    // let co = '【这个#手聚App团购#宝贝不错:镀玫瑰金手镯 女韩版学生森系闺蜜手环 简约百搭个性潮人情侣饰品(分享自@手机淘宝android客户端)】http://m.tb.cn/h.34c2PoJ?sm=c281d9 点击链接，再选择浏览器咑閞；或復·制这段描述€EZZ5b2fr2zU€后到👉淘♂寳♀👈'
    //
    // console.log(MyApp.parseContent(co));

    console.log('check!');


    if (!window['cordova']) return;
    let content = _.trim(await this.clipboard.paste());
    const lastContent = ((await this.localStorage.getAsync('last-search-content')) || '').toString();
    if (content !== '' && content.length >= 2 && content !== lastContent) {
      await this.localStorage.setAsync('last-search-content', content);

      console.log('here! parseContent');
      content = MyApp.parseContent(content);

      console.log(content);




      this.showAlertSearch(content);
    }
  }

  showAlertSearch(content) {
    let alert = this.alertCtrl.create({
      title: '是否要搜索以下内容',
      message: content,
      cssClass: 'search-clipboard',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定搜索',
          handler: () => {
            console.log('Buy clicked');
            this.doSearchClipboard(content);
          }
        }
      ]
    });
    alert.present();
  }


  doSearchClipboard(content) {
    this.app.getRootNav().push(SearchAllPage, { text: content, showLoading: true }, {
      animation: 'ios-transition'
    });
  }

  async loadPid() {
    // const resp = await this.api.getAsync('http://api.shengqianjia.tp.zpei.net/pid', true);
    const resp = await this.api.getAsync(`${base_url}/pid`, true);
    console.log('FIN Pid resp', resp)
    Api.PID = resp['pid'];
    this.api.pid = resp['pid'];
  }


  async loadCats() {
    const resp = await this.api.getAsync('http://v2.api.haodanku.com/super_classify/apikey/' + this.api.haoDanKuKey, true);
    this.api.cats = [{ cid: 0, main_name: '全部' }].concat(resp.general_classify);
  }

  async loadKeywords() {
    const resp = await this.api.getAsync('http://v2.api.haodanku.com/hot_key/apikey/' + this.api.haoDanKuKey, true);
    this.api.searchKeywords = resp.data;
  }
}
