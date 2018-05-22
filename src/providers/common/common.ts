import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Injectable()
export class CommonProvider {

  private readonly DEFAULT_LOADER_CONTENT = "Loading";
  private readonly TOASTER_DURATION = 4000;
  private readonly TOASTER_POSITION = "bottom";

  constructor(
    private loadingCtrl: LoadingController,
    private toaster: ToastController) { }

  displayLoader(content: string = this.DEFAULT_LOADER_CONTENT) {
    let loading = this.loadingCtrl.create({
      content: content
    });

    return new Promise<Loading>((resolve, reject) => {
      loading.present()
        .then(() => { resolve(loading); })
        .catch((error) => { reject(error); })
    })
  }

  presentToaster(msg: string){
    let toast = this.toaster.create({
      message: msg,
      duration: this.TOASTER_DURATION,
      position: this.TOASTER_POSITION
    });
    toast.present();
  }
}
