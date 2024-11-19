import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toastQueue: { message: string; duration: number; color?: string }[] = [];
  private isToastPresenting = false;

  constructor(private toastController: ToastController) { }

  async showToast(message: string, duration = 2000, color: 'success' | 'danger' | 'warning' | 'primary') {
    this.toastQueue.push({ message, duration, color });
    this.presentNextToast();
  }

  private async presentNextToast() {
    if (this.isToastPresenting || this.toastQueue.length === 0) {
      return;
    }

    this.isToastPresenting = true;
    const toastData = this.toastQueue.shift();
    const toast = await this.toastController.create({
      message: toastData?.message,
      duration: toastData?.duration,
      color: toastData?.color,
      position: 'top'
    });

    await toast.present();
    await toast.onDidDismiss();
    this.isToastPresenting = false;

    // Check for the next toast in the queue
    this.presentNextToast();
  }
}
