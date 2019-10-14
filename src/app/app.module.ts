import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Api } from "./api";
import { HttpClientModule } from "@angular/common/http";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ItemDetailPage } from "../pages/itemDetail/itemDetail";
import { HTTP } from '@ionic-native/http';
import { RightTopPopover } from "../popovers/rightTop/rightTop";
import { SharePopover } from "../popovers/share/share";
import { Clipboard } from "@ionic-native/clipboard";
import { SuperTabsModule } from "ionic2-super-tabs";
import { NineOuterPage } from "../pages/nineOuter/nineOuter";
import { ItemsPage } from "../pages/items/items";
import { SuperCategoriesPage } from "../pages/superCategories/superCategories";
import { AppMinimize } from "@ionic-native/app-minimize";
import { MePage } from "../pages/me/me";
import { VideoPlayer } from "@ionic-native/video-player";
import { MainPage } from "../pages/main/main";
import { SearchPage } from "../pages/search/search";
import { LocalStorageModule } from "@ngx-pwa/local-storage";
import { LocalStorageAsync } from "./localStorageAsync";
import { SearchAllPage } from "../pages/searchAll/searchAll";
import { StreamingMedia } from "@ionic-native/streaming-media";
import { ReportPage } from "../pages/report/report";

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PanicPage } from "../pages/panic/panic";
import { PanicDetailPage } from "../pages/panic-detail/panic-detail";
import { CustormerPage } from "../pages/custormer/custormer";
import { DependentPage } from "../pages/dependent/dependent";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    MyApp,
    NineOuterPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemDetailPage,
    RightTopPopover,
    SharePopover,
    ItemsPage,
    SuperCategoriesPage,
    MePage,
    MainPage,
    SearchPage,
    SearchAllPage,
    ReportPage,
    PanicPage,
    PanicDetailPage,
    CustormerPage,
    DependentPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LazyLoadImageModule,
    LocalStorageModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp),
    SwiperModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NineOuterPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemDetailPage,
    RightTopPopover,
    SharePopover,
    ItemsPage,
    SuperCategoriesPage,
    MePage,
    MainPage,
    SearchPage,
    SearchAllPage,
    ReportPage,
    PanicPage,
    PanicDetailPage,
    CustormerPage,
    DependentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalStorageAsync,
    Api,
    HTTP,
    Clipboard,
    AppMinimize,
    VideoPlayer,
    StreamingMedia,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class AppModule { }

