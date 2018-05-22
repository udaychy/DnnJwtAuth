import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginResponse } from '../../model/login-response';
import { HomePage } from '../home/home';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userName: string;
  password: string
  
  constructor(public navCtrl: NavController,
    private authService: AuthProvider,
    private commonService: CommonProvider) {

  }

  login() {
    if (!this.userName || !this.password) {
      this.commonService.presentToaster("Please provide both username and password");
      return;
    }

    this.commonService.displayLoader("Logging In...").then(loader => {
      this.authService.login(this.userName, this.password).then(authData => {
        loader.dismiss();
        if(authData.userId > 0){
          this.commonService.presentToaster("Successfully Logged In");
          this.setHomeAsRoot(authData.userId);
        }else{
          this.commonService.presentToaster("Login Failed");
          this.password= "";
        }
      }).catch(rej => {
        loader.dismiss();
        this.commonService.presentToaster("Login Failed");
        this.password= "";
        console.log(rej);
      })
    })
    
  }

  setHomeAsRoot(userId:number){
    this.navCtrl.setRoot(HomePage, userId)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
