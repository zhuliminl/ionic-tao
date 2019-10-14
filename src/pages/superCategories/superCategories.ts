import { Component, QueryList, ViewChildren } from '@angular/core';
import { App, Content, NavController } from 'ionic-angular';
import { Api } from '../../app/api';
import { ItemsPage } from "../items/items";

@Component({
  selector: 'page-super-categories',
  templateUrl: 'superCategories.html'
})
export class SuperCategoriesPage {
  cats: any = [];
  nowOn: number = 1;
  defaultImage: string = 'assets/imgs/image-loading.png';
  @ViewChildren(Content) contents: QueryList<Content>;

  mainContent: Content;
  constructor(
    public navCtrl: NavController,
    private app: App,
    private api: Api) {
  }

  getImage(url) {
    if (url.indexOf('haodanku.com') > -1) return url;
    return `${url}_250x250.jpg`
  }

  async ionViewDidLoad() {

    const resp = await this.api.getAsync('http://v2.api.haodanku.com/super_classify/apikey/' + this.api.haoDanKuKey, true);
    this.cats = resp.general_classify;
    console.log(this.contents);
    this.mainContent = this.contents.last;
  }

  setOn(cid) {
    this.nowOn = cid;
    setTimeout(() => {
      this.mainContent.scrollToTop(90);
      setTimeout(() => {
        this.mainContent.scrollTo(this.mainContent.scrollLeft, this.mainContent.scrollTop + 1);
        this.mainContent.scrollTo(this.mainContent.scrollLeft, this.mainContent.scrollTop - 1);
      }, 100);
    }, 200);
  }

  goItems(son_name, cid) {
    this.app.getRootNav().push(ItemsPage, {
      hasHeader: true,
      headerTitle: son_name,
      searchPage: true,
      searchText: son_name,
      searchCid: cid,
      apiParams: '',
      defaultSort: '/sort/5'
    }, {
        animation: 'ios-transition'
      });
  }

}
