import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Injectable()
export class CommonProvider {

  private readonly TOASTER_DURATION = 4000;
  private readonly TOASTER_POSITION = "bottom";

  public readonly toasterMsg = {
    loginSuccess : "Successfully Logged In",
    logoutSuccess : "Successfully Logged Out",
    loginFailed : "Login Failed",
    loginFormRequired: "Please provide both User Name and Password"
  }
  public readonly loaderMsg = {
    loading: "Loading...",
    login: "Logging In..."
  }

  constructor(
    private loadingCtrl: LoadingController,
    private toaster: ToastController) { }

  displayLoader(content: string = this.loaderMsg.loading) {
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
