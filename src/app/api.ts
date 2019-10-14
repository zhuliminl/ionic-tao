import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AlertController, Tabs, Toast, ToastController } from "ionic-angular";

import { HTTP } from '@ionic-native/http';


@Injectable()
export class Api {
  haoDanKuKey = 'taobaicai';
  baseUrl = 'http://v2.api.haodanku.com/itemlist/apikey/' + this.haoDanKuKey;
  cats: any = {};
  searchKeywords: any = [];
  toast: Toast;
  isIphoneX: boolean = false;
  isIphoneOthers: boolean = false;
  bottomTabs: Tabs;
  subjects: any;
  static PID: string = 'mm_25980018_42824094_265658036';
  pid: string = 'mm_25980018_42824094_265658036';

  constructor(public http: HttpClient,
    public alertCtrl: AlertController,
    private httpNative: HTTP,
    private toastCtrl: ToastController) {
    this.pid = Api.PID;

  }

  showToast(text) {
    this.hideToast();
    this.toast = this.toastCtrl.create({
      message: text,
      duration: 1500,
      position: 'middle'
    });

    this.toast.present();
  }

  hideToast() {
    if (this.toast) this.toast.dismissAll();
  }

  async loadSubject() {
    const resp = await this.getAsync(`http://v2.api.haodanku.com/get_subject/apikey/${this.haoDanKuKey}`, true);
    this.subjects = resp.data;
  }

  async alertAsync(msg: string) {
    return new Promise((resolve) => {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: msg,
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: '确定',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      alert.present();
    });
  }

  async getTaobaoDetail(id) {
    if (!window['cordova']) {
      console.log('dev mode');
      return {
        api: "mtop.wdetail.getItemDescx",
        data: {
          pages: [
            "<img>https://img.alicdn.com/imgextra/i3/2192352451/TB2mmkAg_TI8KJjSsphXXcFppXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB2M4Ixg46I8KJjSszfXXaZVXXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i4/2192352451/TB2oiJdhb_I8KJjy1XaXXbsxpXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i2/2192352451/TB2hyRehmfD8KJjSszhXXbIJFXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i3/2192352451/TB216Iyg_nI8KJjSszgXXc8ApXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB2O3QIg0rJ8KJjSspaXXXuKpXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB2kDoEg22H8KJjy0FcXXaDlFXa_!!2192352451.jpg</img>",
            "<img>https://img.alicdn.com/imgextra/i1/2192352451/TB2BCo3g0nJ8KJjSszdXXaxuFXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB28e4ehh6I8KJjy0FgXXXXzVXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB2U8tqcoo09KJjSZFDXXb9npXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i3/2192352451/TB2W0Vehh6I8KJjy0FgXXXXzVXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB2Wm7pg0bJ8KJjy1zjXXaqapXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB2cL3Ig0rJ8KJjSspaXXXuKpXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i3/2192352451/TB2DnvlbQfb_uJkSnhJXXbdDVXa_!!2192352451.jpg</img>",
            "<img>https://img.alicdn.com/imgextra/i1/2192352451/TB2TTsOg3nH8KJjSspcXXb3QFXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB2aS3.g26H8KJjSspmXXb2WXXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i2/2192352451/TB2Z7G2cpHM8KJjSZJiXXbx3FXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i4/2192352451/TB2j5Uhg8DH8KJjSszcXXbDTFXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB2YwoFg8HH8KJjy0FbXXcqlpXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i2/2192352451/TB2TYnXbPgy_uJjSZKbXXXXkXXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i2/2192352451/TB2K_7.g26H8KJjSspmXXb2WXXa_!!2192352451.jpg</img>",
            "<img>https://img.alicdn.com/imgextra/i4/2192352451/TB2ThwPg4HI8KJjy1zbXXaxdpXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i4/2192352451/TB2WhEPg4HI8KJjy1zbXXaxdpXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i2/2192352451/TB2DxOZbPgy_uJjSZSyXXbqvVXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB2WQW8cBfM8KJjSZPiXXXdspXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i2/2192352451/TB2uEZOg3nH8KJjSspcXXb3QFXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i3/2192352451/TB2ISuTf63z9KJjy0FmXXXiwXXa_!!2192352451.jpg</img><img>https://img.alicdn.com/imgextra/i1/2192352451/TB23zrMcBbM8KJjSZFFXXaynpXa_!!2192352451.jpg</img>",
            "<img>https://img.alicdn.com/imgextra/i3/2192352451/TB20nXvbZic_eJjSZFnXXXVwVXa_!!2192352451.jpg</img>"
          ],
          images: [
            "https://img.alicdn.com/imgextra/i3/2192352451/TB2mmkAg_TI8KJjSsphXXcFppXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2M4Ixg46I8KJjSszfXXaZVXXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i4/2192352451/TB2oiJdhb_I8KJjy1XaXXbsxpXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i2/2192352451/TB2hyRehmfD8KJjSszhXXbIJFXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i3/2192352451/TB216Iyg_nI8KJjSszgXXc8ApXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2O3QIg0rJ8KJjSspaXXXuKpXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2kDoEg22H8KJjy0FcXXaDlFXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2BCo3g0nJ8KJjSszdXXaxuFXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB28e4ehh6I8KJjy0FgXXXXzVXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2U8tqcoo09KJjSZFDXXb9npXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i3/2192352451/TB2W0Vehh6I8KJjy0FgXXXXzVXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2Wm7pg0bJ8KJjy1zjXXaqapXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2cL3Ig0rJ8KJjSspaXXXuKpXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i3/2192352451/TB2DnvlbQfb_uJkSnhJXXbdDVXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2TTsOg3nH8KJjSspcXXb3QFXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2aS3.g26H8KJjSspmXXb2WXXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i2/2192352451/TB2Z7G2cpHM8KJjSZJiXXbx3FXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i4/2192352451/TB2j5Uhg8DH8KJjSszcXXbDTFXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2YwoFg8HH8KJjy0FbXXcqlpXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i2/2192352451/TB2TYnXbPgy_uJjSZKbXXXXkXXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i2/2192352451/TB2K_7.g26H8KJjSspmXXb2WXXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i4/2192352451/TB2ThwPg4HI8KJjy1zbXXaxdpXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i4/2192352451/TB2WhEPg4HI8KJjy1zbXXaxdpXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i2/2192352451/TB2DxOZbPgy_uJjSZSyXXbqvVXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB2WQW8cBfM8KJjSZPiXXXdspXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i2/2192352451/TB2uEZOg3nH8KJjSspcXXb3QFXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i3/2192352451/TB2ISuTf63z9KJjy0FmXXXiwXXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i1/2192352451/TB23zrMcBbM8KJjSZFFXXaynpXa_!!2192352451.jpg",
            "https://img.alicdn.com/imgextra/i3/2192352451/TB20nXvbZic_eJjSZFnXXXVwVXa_!!2192352451.jpg"
          ]
        },
        ret: [
          "SUCCESS::接口调用成功"
        ],
        v: "4.1"
      };
    }
    try {
      const data = encodeURIComponent(`{"item_num_id":"${id}"}`);
      const url = `http://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?data=${data}`;
      const resp: any = await this.nativeGetAsync(url);
      return JSON.parse(resp.data);
    } catch (err) {
      console.log('dev mode or parse json error:', err);
      return {};
    }

  }

  async nativeGetAsync(url) {
    return new Promise(resolve => {
      this.httpNative.get(url, {}, {}).then(data => {
        resolve(data);
      })
    });
  }

  async postAsync(url, body, direct = false) {
    try {
      return await this._postAsync(url, body, direct);
    } catch (e) {
      const alertResult = await this.alertAsync('网络链接错误，是否要重试');
      if (alertResult) {
        return await this.postAsync(url, body, direct);
      }
    }
  }

  _postAsync(url, body, direct) {
    return new Promise((resolve, reject) => {

      let fullUrl = `${this.baseUrl}${url}`;
      if (direct === true) {
        fullUrl = url;
      }

      if (body['isForm'] === true) {
        delete body['isForm'];
        let formParams = new URLSearchParams();
        for (let key in body) {
          formParams.append(key, body[key]);
        }

        this.http.post(fullUrl, formParams.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).subscribe((data: any) => {
          resolve(data)
        }, (error: HttpErrorResponse) => {
          console.log(error);
          reject(error);
        });
      } else {
        this.http.post(fullUrl, body).subscribe((data: any) => {
          resolve(data)
        }, (error: HttpErrorResponse) => {
          console.log(error);
          reject(error);
        });
      }


    });
  }

  async getAsync(url, direct = false) {
    try {
      return await this._getAsync(url, direct);
    } catch (e) {
      const alertResult = await this.alertAsync('网络链接错误，是否重试');
      if (alertResult) {
        return await this.getAsync(url, direct);
      }
    }
  }

  _getAsync(url, direct = false) {

    return new Promise((resolve, reject) => {
      let fullUrl = `${this.baseUrl}${url}`;
      if (direct === true) {
        fullUrl = url;
      }
      console.log('FIN get fullUrl => ' + fullUrl);

      this.http.get(fullUrl).subscribe((data: any) => {
        console.log('FIN get fullUrl => ' + fullUrl + ' done');
        resolve(data)
      }, (error: HttpErrorResponse) => {
        reject(error);
      });
    });
  }
}
