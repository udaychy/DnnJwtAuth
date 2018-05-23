import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { CommonProvider } from '../../providers/common/common';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginForm: FormGroup

  constructor(public navCtrl: NavController,
    private authService: AuthProvider,
    private commonService: CommonProvider,
    private formBuilder: FormBuilder,
    private menu: MenuController) {
      
      this.loginForm = this.formBuilder.group({
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      });
      this.menu.enable(false);
  }

  login() {
    console.log(this.loginForm.value)

    if (!this.loginForm.value.userName || !this.loginForm.value.password) {
      this.commonService.presentToaster(this.commonService.toasterMsg.loginFormRequired);
      return;
    }

    this.commonService.displayLoader(this.commonService.loaderMsg.login).then(loader => {
      this.authService.login(this.loginForm.value.userName, this.loginForm.value.password).then(authData => {
        loader.dismiss();
        authData.userId > 0 ? this.loginSuccess(authData.userId) : this.loginFailed()
      }).catch(rej => {
        loader.dismiss();
        this.loginFailed()
        console.log(rej);
      })
    })
    
  }

  loginSuccess(userId: number){
    this.commonService.presentToaster(this.commonService.toasterMsg.loginSuccess);
    this.menu.enable(true);
    this.setHomeAsRoot(userId);
  }

  loginFailed(){
    this.commonService.presentToaster(this.commonService.toasterMsg.loginFailed);
    this.loginForm.controls['password'].reset();
  }

  setHomeAsRoot(userId:number){
    this.navCtrl.setRoot(HomePage, userId)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
