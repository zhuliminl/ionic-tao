import { Component } from '@angular/core';
import { Api } from "../../app/api";
// import {AlertController, App, NavController} from 'ionic-angular';

const base_url = 'http://api.shengqianjia.tbbmn.com'

@Component({
  selector: 'page-dependent',
  templateUrl: 'dependent.html'
})
export class DependentPage {

  content: string;
  constructor(private api: Api) {

  }

  ionViewDidLoad() {
    this.loadData();
  }


  async loadData() {
    // const resp = await this.api.getAsync('http://api.shengqianjia.tp.zpei.net/about', true);
    const resp = await this.api.getAsync(base_url + '/about', true);
    this.content = resp.content;

  }
}
