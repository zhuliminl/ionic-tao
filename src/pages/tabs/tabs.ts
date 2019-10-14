import { Component, ViewChild } from '@angular/core';

//import { NineOuterPage } from '../nineOuter/nineOuter';
import { SuperCategoriesPage } from "../superCategories/superCategories";
import { ItemsPage } from "../items/items";
import { MePage } from "../me/me";
import { MainPage } from "../main/main";
import { Tabs } from "ionic-angular";
import { Api } from "../../app/api";
import { PanicPage } from "../panic/panic";
// import {TestAmazingTabPage} from "../testAmazingTab/testAmazingTab";
//import {HomePage} from "../home/home";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MainPage;

  tab2Root = PanicPage;
  tab3Root = SuperCategoriesPage;
  tab4Root = ItemsPage;
  tab5Root = MePage;

  @ViewChild('bottomTabs') bottomTabs: Tabs;

  juHuaSuanParams = {
    apiParams: '',
    defaultSort: '/sort/5',
    juHuaSuan: true,
    hasHeader: true,
    headerTitle: '聚划算'
  };

  constructor(private api: Api) {

  }

  ionViewDidLoad() {
    this.api.bottomTabs = this.bottomTabs;
  }


}
