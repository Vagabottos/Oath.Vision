import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async loading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });

    return loading;
  }

  async toast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          text: 'Close'
        }
      ]
    });

    toast.present();
  }

  async confirm(title: string, message: string, confirmText: string, finalize: () => void) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: confirmText,
          handler: finalize
        }
      ]
    });

    alert.present();
  }
}
