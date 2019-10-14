import { Component, NgZone, ViewChild } from "@angular/core";
import { App, Content, LoadingController, Navbar, NavController, NavParams } from "ionic-angular";
import { Api } from "../../app/api";
import { ItemDetailPage } from "../itemDetail/itemDetail";


@Component({
  selector: 'page-items',
  templateUrl: 'items.html'
})
export class ItemsPage {
  minId: number = 1;
  showGoToTop: boolean = false;
  apiParams: string = '';

  defaultImage: string = 'assets/imgs/image-loading.png';

  preloadCount: number = 0;
  itemImageWidth: number = 0;
  nowTab: number = 1;
  nowSort: string;
  isSearchPage: boolean = false;
  hasHeader: boolean = false;
  headerTitle: string;
  isJuHuaSuan: boolean = false;
  hasSort: boolean = true;
  hasMore: boolean = true;
  show404 = false;
  mustCoupon: number = 1;
  pageSize: number = 10;
  public items: any = [];
  preLoader: any = null;
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private api: Api, public zone: NgZone, private app: App) {

    this.apiParams = this.navParams.data.apiParams;
    this.apiParams += this.navParams.data.defaultSort;
    this.nowSort = this.navParams.data.defaultSort;
    this.minId = 1;
    this.itemImageWidth = (window.innerWidth / 2) - 3;
    if (this.navParams.data.searchPage === true) this.isSearchPage = true;
    if (this.navParams.data.hasHeader === true) {
      this.hasHeader = true;
      this.headerTitle = this.navParams.data.headerTitle;
    }
    if (this.navParams.data.juHuaSuan === true) this.isJuHuaSuan = true;
    if (this.navParams.data.hasSort === false) this.hasSort = false;
    if (this.navParams.data.hasMore === false) this.hasMore = false;

    /*
      hasHeader: true,
      headerTitle: son_name,
      searchPage: true,
      searchText: son_name,
      searchCid: cid
    * */
  }

  getImage(url) {
    if (url.indexOf('haodanku.com') > -1) return url;
    return `${url}_250x250.jpg`
  }

  ionViewDidLoad() {
    if (this.navBar) {
      this.navBar.backButtonClick = (e) => {
        // this.app.getRootNav().pop({
        //   animation: 'ios-transition'
        // });


        if (this.navParams.get('isSearchAll') === true) {
          this.app.getRootNav().popToRoot({
            animation: 'ios-transition'
          })
        } else {
          this.app.getRootNav().pop({
            animation: 'ios-transition'
          });
        }


      };
    }
    // window.lazySizesConfig = window.lazySizesConfig || {};
    // console.log(window.lazySizesConfig);
    // window.lazySizesConfig.loadMode = 1;


    // //window.lazySizes.loader.checkElems;

    // document.addEventListener('touchmove', window.lazySizes.loader.checkElems, true);
    // document.addEventListener('touchend', function(){
    //     setTimeout(window.lazySizes.loader.checkElems, 300);
    // }, true);

  }

  ionViewDidEnter() {
    this.minId = 1;
    this.loadData(false);
  }


  async loadData(more = false) {
    const start = Date.now();
    let resp: any;
    if (this.isSearchPage === true) {
      if (this.navParams.data.isSearchAll === true) {
        if (this.navParams.data.loader) {
          this.preLoader = this.navParams.data.loader;
        }
        const searchText = encodeURI(encodeURI(this.navParams.data.searchText));
        resp = await this.api.getAsync(`http://v2.api.haodanku.com/supersearch/apikey/${this.api.haoDanKuKey}/keyword/${searchText}/is_coupon/${this.mustCoupon}/back/${this.pageSize}${this.apiParams}/min_id/${this.minId}`, true);
        if (resp['data'] && resp['data'].length < 1) {
          this.mustCoupon = 0;
          resp = await this.api.getAsync(`http://v2.api.haodanku.com/supersearch/apikey/${this.api.haoDanKuKey}/keyword/${searchText}/is_coupon/${this.mustCoupon}/back/${this.pageSize}${this.apiParams}/min_id/${this.minId}`, true);
        }

        if (this.preLoader) {
          await this.preLoader.dismiss();
        }

      } else {
        const searchText = encodeURI(encodeURI(this.navParams.data.searchText));
        resp = await this.api.getAsync(`http://v2.api.haodanku.com/get_keyword_items/apikey/${this.api.haoDanKuKey}/keyword/${searchText}/back/${this.pageSize}${this.apiParams}/cid/${this.navParams.data.searchCid}/min_id/${this.minId}`, true);
      }

    } else if (this.navParams.data.isToadyNew === true) {
      resp = await this.api.getAsync(`http://v2.api.haodanku.com/column/apikey/${this.api.haoDanKuKey}/type/1/back/${this.pageSize}${this.apiParams}/min_id/${this.minId}`, true);
    } else if (this.isJuHuaSuan === true) {
      resp = await this.api.getAsync(`http://v2.api.haodanku.com/column/apikey/${this.api.haoDanKuKey}/type/4/back/${this.pageSize}${this.apiParams}/min_id/${this.minId}`, true);
    } else if (this.navParams.data.isSubject === true) {
      resp = await this.api.getAsync(`http://v2.api.haodanku.com/get_subject_item/apikey/${this.api.haoDanKuKey}/id/${this.navParams.data.subjectId}`, true)
    } else if (this.navParams.data.isCatPage === true) {
      resp = await this.api.getAsync(`http://v2.api.haodanku.com/itemlist/apikey/${this.api.haoDanKuKey}/nav/3/cid/${this.navParams.data.cid}/back/${this.pageSize}/min_id/${this.minId}`, true);
    } else if (this.navParams.data.isHotBrand === true) {
      resp = await this.api.getAsync(`http://v2.api.haodanku.com/column/apikey/${this.api.haoDanKuKey}/type/8/back/${this.pageSize}${this.apiParams}/min_id/${this.minId}`, true);
    } else if (this.navParams.data.isVideo === true) {
      resp = await this.api.getAsync(`http://v2.api.haodanku.com/column/apikey/${this.api.haoDanKuKey}/type/10/back/${this.pageSize}${this.apiParams}/min_id/${this.minId}`, true);
    } else if (this.navParams.data.isTaoQiangGou === true) {
      resp = await this.api.getAsync(`http://v2.api.haodanku.com/column/apikey/${this.api.haoDanKuKey}/type/5/back/${this.pageSize}${this.apiParams}/min_id/${this.minId}`, true);
    } else {
      if (this.navParams.data.apiParams === 'price_max/10') {
        resp = await this.api.getAsync(`http://v2.api.haodanku.com/column/apikey/${this.api.haoDanKuKey}/type/2/back/${this.pageSize}/${this.apiParams}/min_id/` + this.minId, true);
      } else {
        resp = await this.api.getAsync(`/nav/3/cid/0/back/${this.pageSize}/${this.apiParams}/min_id/` + this.minId);
      }
    }

    if (this.navParams.data.show404 === true) {
      this.show404 = true;
    }

    if (resp['data'] && resp['data'].length < this.pageSize) {
      this.hasMore = false;
    }


    // this.bad = [];
    // for(let it of resp['data']) {
    //   if (it.end_time === '0') this.bad.push(it);
    // }
    // console.log(this.bad.length, this.minId);

    this.minId = resp.min_id;
    if (more === true) {
      for (let item of resp['data']) {
        this.items.push(item);
      }

      return
    }
    this.items = resp['data'];

    const ms = Date.now() - start;
    console.log(`items => loadData => - ${ms}ms`);

  }

  async doRefresh(refresher) {
    this.minId = 1;
    const start = Date.now();
    await this.loadData();
    const ms = Date.now() - start;
    if (ms <= 1000) {
      setTimeout(() => {
        refresher.complete();
      }, 1000 - ms);
    } else {
      refresher.complete();
    }

  }

  goToTop() {
    this.showGoToTop = false;

    const wait = this.content.isScrolling ? 150 : 0;
    setTimeout(() => this.content.scrollToTop(200), wait);
  }

  async doInfinite() {
    if (this.navParams.data.hasMore === false) return;
    this.loadData(true);
  }

  onScroll($event) {

    if ($event) {
      this.zone.run(() => {
        this.showGoToTop = $event.scrollTop > 500
      })
    }

  };

  openItem(item) {

    this.app.getRootNav().push(ItemDetailPage, { item }, {
      animation: 'ios-transition'
    });
  }

  doSort(name, id, name2) {
    if (this.nowSort === name && id !== 4) return;
    this.nowTab = id;
    this.minId = 1;
    if (this.nowSort === name) {
      name = name2;
    }
    this.nowSort = name;
    this.apiParams = this.navParams.data.apiParams + name;
    const loader = this.loadingCtrl.create({
      content: "正在加载..."
    });
    loader.present();
    this.loadData();
    loader.dismiss();
  }

}
