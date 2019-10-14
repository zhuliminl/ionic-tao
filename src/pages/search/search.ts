import { Component, ViewChild } from '@angular/core';
import { App, Navbar, NavController } from 'ionic-angular';
import { Api } from "../../app/api";
import _ from 'lodash';
import { LocalStorageAsync } from "../../app/localStorageAsync";
import { ItemsPage } from "../items/items";
import { SearchAllPage } from "../searchAll/searchAll";
import { StatusBar } from "@ionic-native/status-bar";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  public _: any = _;
  searchText: string = '';
  histories: any = [];
  hotKeywords: any = [];
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
    public api: Api,
    private app: App,
    private statusBar: StatusBar,
    protected localStorage: LocalStorageAsync) {

  }

  async ionViewDidEnter() {
    this.statusBar.styleDefault();
  }
  async ionViewWillLeave() {
    this.statusBar.styleLightContent();
  }

  async ionViewDidLoad() {
    if (this.navBar) {
      this.navBar.backButtonClick = (e) => {
        this.app.getRootNav().pop({
          animation: 'ios-transition'
        });
      };
    }
    this.histories = await this.localStorage.getAsync('search-histories') || [];
    this.hotKeywords = _.sampleSize(this.api.searchKeywords, 20);
  }

  async readySearch() {
    if (_.trim(this.searchText) === '') return this.api.showToast('请输入关键词');
    await this.doSearch(this.searchText);
    this.searchText = '';
  }

  async doSearch(text) {
    if (this.histories.length > 30) {
      this.histories = _.drop(this.histories);
    }
    const index = this.histories.indexOf(text);
    if (index > -1) {
      this.histories.splice(index, 1);
    }
    this.histories.push(text);

    await this.localStorage.setAsync('search-histories', this.histories);

    this.app.getRootNav().push(ItemsPage, {
      hasHeader: true,
      headerTitle: text,
      searchPage: true,
      searchText: text,
      searchCid: 0,
      apiParams: '',
      defaultSort: '/sort/5',
      show404: true,
      text404: '没有找到相关商品'
    }, {
        animation: 'ios-transition'
      });
  }

  async clearHistories() {
    await this.localStorage.removeAsync('search-histories');
    this.histories = [];
  }

  goSearchAll() {
    this.app.getRootNav().push(SearchAllPage, {}, {
      animation: 'ios-transition'
    });
  }

}
