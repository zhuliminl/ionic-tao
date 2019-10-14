import { Component } from '@angular/core';
import { Api } from "../../app/api";
// import {AlertController, App, NavController} from 'ionic-angular';

const base_url = 'http://api.shengqianjia.tbbmn.com'

@Component({
  selector: 'page-custormer',
  templateUrl: 'custormer.html'
})
export class CustormerPage {
  wechat: string;
  qq: string;
  tel: string;
  time: string;
  show_time: boolean = false;
  question: string;
  constructor(private api: Api) {

  }

  ionViewDidLoad() {
    this.loadData();
  }


  async loadData() {
    // const resp = await this.api.getAsync('http://api.shengqianjia.tp.zpei.net/contact', true);
    const resp = await this.api.getAsync(base_url + '/contact', true);
    this.wechat = resp['wechat'];
    this.qq = resp['qq'];
    this.tel = resp['tel'];
    this.time = resp['time'];
    this.show_time = resp['show_time'];
    this.question = resp['question'];
  }
}
