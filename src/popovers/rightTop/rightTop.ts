import { Component } from '@angular/core';
import { App, NavParams, ViewController } from 'ionic-angular';
import { TabsPage } from "../../pages/tabs/tabs";
import { ItemDetailPage } from "../../pages/itemDetail/itemDetail";
import { SearchPage } from "../../pages/search/search";
import { ReportPage } from "../../pages/report/report";
import { CustormerPage } from "../../pages/custormer/custormer";

@Component({
  selector: 'popover-right-top',
  templateUrl: 'rightTop.html'
})
export class RightTopPopover {

  private parent: ItemDetailPage;
  constructor(
    public viewCtrl: ViewController,
    //private alertCtrl: AlertController,
    public app: App,
    private navParams: NavParams
  ) {


  }

  ngOnInit() {
    this.parent = this.navParams.data.parent;
  }

  goHome() {
    this.viewCtrl.dismiss();
    this.app.getRootNav().setRoot(TabsPage);
  }

  goShare() {
    this.viewCtrl.dismiss();
    this.parent.showShare();

  }

  contact() {
    this.viewCtrl.dismiss();
    this.app.getRootNav().push(CustormerPage, {}, {
      animation: 'ios-transition'
    });
  }

  goReport() {
    this.viewCtrl.dismiss();
    this.app.getRootNav().push(ReportPage, {}, {
      animation: 'ios-transition'
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  goSearch() {
    this.app.getRootNav().push(SearchPage, {}, {
      animation: 'ios-transition'
    });
    this.viewCtrl.dismiss();
  }

}
