import { Component } from '@angular/core';
import { AlertController, App, NavController } from 'ionic-angular';

@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {

  constructor(public navCtrl: NavController,
    private app: App,
    private alertCtrl: AlertController) {
  }

  submitReport() {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: '您的反馈已经提交，感谢您的宝贵建议',
      buttons: [{
        text: '确定',
        role: 'cancel',
        handler: () => {
          this.app.getRootNav().pop({
            animation: 'ios-transition'
          });
        }
      }]
    });
    alert.present();
  }

}
