import { Component, ViewChild } from '@angular/core';
import { App, LoadingController, Navbar, NavController, NavParams } from 'ionic-angular';
import { Api } from "../../app/api";
import _ from 'lodash';
import { ItemsPage } from "../items/items";
import { StatusBar } from "@ionic-native/status-bar";


@Component({
  selector: 'page-search-all',
  templateUrl: 'searchAll.html'
})
export class SearchAllPage {
  searchText: string = '';
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public api: Api,
    private navParams: NavParams,
    private statusBar: StatusBar,
    private app: App) {



  }

  async ionViewDidEnter() {
    this.statusBar.styleDefault();
  }
  async ionViewWillLeave() {
    this.statusBar.styleLightContent();
  }


  async ionViewDidLoad() {
    this.statusBar.styleDefault();
    if (this.navBar) {
      this.navBar.backButtonClick = (e) => {
        // this.app.getRootNav().goToRoot(TabsPage);
        this.app.getRootNav().popToRoot({
          animation: 'ios-transition'
        })
        // this.app.getRootNav().pop({
        //   animation: 'ios-transition'
        // });
      };
    }

    if (this.navParams.data.text) {
      const loader = this.loadingCtrl.create({
        content: "正在全网搜索..."
      });
      await loader.present();
      this.searchText = this.navParams.data.text;
      await this.readySearch(loader);

    }
  }

  async readySearch(loader?) {
    if (_.trim(this.searchText) === '') return this.api.showToast('请输入关键词');
    await this.doSearch(this.searchText, loader);
    this.searchText = '';
  }

  async doSearch(text, loader?) {


    this.app.getRootNav().push(ItemsPage, {
      hasHeader: true,
      headerTitle: text,
      searchPage: true,
      searchText: text,
      isSearchAll: true,
      apiParams: '',
      defaultSort: '/sort/6',
      sort2: '/sort/1',
      sort3: '/sort/2',
      sort4: '/sort/4',
      sort5: '/sort/5',
      show404: true,
      text404: '没有找到相关商品',
      loader
    }, {
        animation: 'ios-transition'
      });
  }

}
