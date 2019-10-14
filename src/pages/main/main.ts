import { Component, ViewChild } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { Api } from "../../app/api";
import { ItemsPage } from "../items/items";
import { SuperTabs } from "ionic2-super-tabs";
import { SearchPage } from "../search/search";

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  cats: any = [];
  isShowCats: boolean = false;
  bodyHeight: number = window.innerHeight - 44 - 54;
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  constructor(public navCtrl: NavController,
    private app: App,
    public api: Api) {
    this.cats = this.api.cats;
  }

  getPageByCid(cid) {
    if (cid === 0) return HomePage;
    return ItemsPage;
  }


  ionViewDidLoad() {

  }

  showCats() {
    this.isShowCats = !this.isShowCats;
  }
  doSelectTopTab(index) {
    this.isShowCats = false;
    this.superTabs.slideTo(index);
  }

  goSearch() {
    this.app.getRootNav().push(SearchPage, {}, {
      animation: 'ios-transition'
    });
  }

}
