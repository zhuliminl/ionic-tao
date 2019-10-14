import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { ItemsPage } from "../items/items";
import { Api } from "../../app/api";
import { StatusBar } from "@ionic-native/status-bar";
//import {NineteenItemsPage} from "../nineteenItems/nineteenItems";

@Component({
  selector: 'page-nine-outer',
  templateUrl: 'nineOuter.html'
})
export class NineOuterPage {
  page1 = ItemsPage;
  page2 = ItemsPage;
  constructor(public navCtrl: NavController, private statusBar: StatusBar, public api: Api, private app: App) {
  }

  async ionViewDidEnter() {
    this.statusBar.styleDefault();
  }
  async ionViewWillLeave() {
    this.statusBar.styleLightContent();
  }

  goBack() {
    this.app.getRootNav().pop({
      animation: 'ios-transition'
    });
  }



}
