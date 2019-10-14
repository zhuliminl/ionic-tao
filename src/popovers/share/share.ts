import { Component } from '@angular/core';
import { App, LoadingController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { TabsPage } from "../../pages/tabs/tabs";
import { ItemDetailPage } from "../../pages/itemDetail/itemDetail";
import { Api } from "../../app/api";
import { Clipboard } from "@ionic-native/clipboard";
import { LocalStorageAsync } from "../../app/localStorageAsync";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'popover-share',
  templateUrl: 'share.html'
})
export class SharePopover {
  private parent: ItemDetailPage;

  constructor(
    public viewCtrl: ViewController,
    public app: App,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private api: Api,
    private clipboard: Clipboard,
    private localStorage: LocalStorageAsync,
    public loadingCtrl: LoadingController
  ) {

  }

  ngOnInit() {
    this.parent = this.navParams.data.parent;
  }

  goHome() {
    this.app.getRootNav().setRoot(TabsPage);
    this.viewCtrl.dismiss();
  }

  goShare() {
    this.parent.showShare();
    this.viewCtrl.dismiss();
  }

  async goWechat() {
    if (window['Wechat']) {
      const Wechat = window['Wechat'];
      // const params = {
      //   scene: Wechat.Scene.SESSION,
      //   message: {
      //     title: this.parent.item.itemshorttitle,
      //     description: this.parent.item.itemdesc,
      //     thumb: this.parent.item.itempic,
      //     media: {
      //       type: Wechat.Type.WEBPAGE,
      //       webpageUrl: "https://www.baidu.com"
      //     }
      //   }
      // };

      const loader = this.loadingCtrl.create({
        content: "正在获取淘口令..."
      });
      loader.present();
      const tpwd = await this.getTpwd();
      loader.dismiss();

      const params = {
        scene: Wechat.Scene.SESSION,
        text: tpwd
      };

      console.log('ready share wechat');
      Wechat.share(params, () => {
        console.log('success!');
        let toast = this.toastCtrl.create({
          message: '微信分享成功',
          duration: 1500,
          position: 'middle'
        });

        toast.present();
      }, (reason) => {
        console.log('failed!!');
      });
    }

    this.viewCtrl.dismiss();

  }

  async goWechatTimeline() {
    if (window['Wechat']) {
      // const Wechat = window['Wechat'];
      // const params = {
      //   scene: Wechat.Scene.TIMELINE,
      //   message: {
      //     title: this.parent.item.itemshorttitle,
      //     description: this.parent.item.itemdesc,
      //     thumb: this.parent.item.itempic,
      //     media: {
      //       type: Wechat.Type.WEBPAGE,
      //       webpageUrl: "https://www.baidu.com"
      //     }
      //   }
      //   //scene: Wechat.Scene.TIMELINE   // share to Timeline
      // };
      // Wechat.share(params, () => {
      //   let toast = this.toastCtrl.create({
      //     message: '微信分享成功',
      //     duration: 1500,
      //     position: 'middle'
      //   });
      //
      //   toast.present();
      // }, (reason) => {
      //
      // });

      await this.goCopyTpwd('淘口令复制成功，现在您可以粘贴到朋友圈了');

    }

    this.viewCtrl.dismiss();
  }


  close() {
    this.viewCtrl.dismiss();
  }

  async getTpwd() {
    const body = {
      url: this.parent.newUrl,
      text: this.parent.item.itemtitle,
      logo: this.parent.item.itempic
    };

    const key = CryptoJS.SHA1(JSON.stringify(body));

    let result = await localStorage.getItem(`tpwd|${key}`);

    if (!result) {
      const base_url = 'http://api.shengqianjia.tbbmn.com'
      // const resp = await this.api.postAsync('http://api.shengqianjia.tp.zpei.net/taobao/tpwd', body, true);
      const resp = await this.api.postAsync(base_url + '/taobao/tpwd', body, true);
      result = `${this.parent.item.itemtitle} 復·制这段描述${resp.resp.data.model}后到👉淘♂寳♀👈`;
      await localStorage.setItem(`tpwd|${key}`, result);
    }

    await this.localStorage.setAsync('last-search-content', result);

    return result;
  }

  async goCopyTpwd(message = '淘口令复制成功') {
    const loader = this.loadingCtrl.create({
      content: "正在获取淘口令..."
    });
    loader.present();
    const tpwd = await this.getTpwd();
    loader.dismiss();
    this.clipboard.copy(tpwd);
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'middle'
    });

    toast.present();
    //this.close();
  }

}
