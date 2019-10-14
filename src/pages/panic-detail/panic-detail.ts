import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Api } from "../../app/api";
import { ItemDetailPage } from '../itemDetail/itemDetail';

/**
 * Generated class for the PanicDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-panic-detail',
  templateUrl: 'panic-detail.html',
})
export class PanicDetailPage {
  minId: number = 1;
  items: any = [];
  showInfinite: boolean = false;
  loaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api, private app: App) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad PanicDetailPage');
    console.log(this.navParams.data);
    const base_url = 'http://api.shengqianjia.tbbmn.com'

    // const resp = await this.api.postAsync(`http://api.shengqianjia.tp.zpei.net/shengqian/kuai`, {
    const resp = await this.api.postAsync(`${base_url}/shengqian/kuai`, {
      apikey: this.api.haoDanKuKey,
      hour_type: this.navParams.data.id,
      min_id: this.minId
    }, true);
    this.loaded = true;
    this.items = resp.data;
    this.showInfinite = (resp.code === 1);
    this.minId = resp.min_id;
    console.log('ionViewDidLoad PanicDetailPage', resp);
  }

  openItem(item) {
    console.log(item);
    this.app.getRootNav().push(ItemDetailPage, { item }, {
      animation: 'ios-transition'
    });
  }

}
