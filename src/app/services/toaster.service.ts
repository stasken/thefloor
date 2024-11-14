import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning' | 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top', // 'top', 'bottom', or 'middle'
      color,           // For success: 'success', for error: 'danger'
      // buttons: [
      //   {
      //     text: 'Close',
      //     role: 'cancel'
      //   }
      // ]
    });
    await toast.present();
  }
}
