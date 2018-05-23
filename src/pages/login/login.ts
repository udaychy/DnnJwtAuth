import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { CommonProvider } from '../../providers/common/common';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginForm: FormGroup

  constructor(public navCtrl: NavController,
    private authService: AuthProvider,
    private commonService: CommonProvider,
    private formBuilder: FormBuilder) {
      this.loginForm = this.formBuilder.group({
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      });
  }

  login() {
    console.log(this.loginForm.value)

    if (!this.loginForm.value.userName || !this.loginForm.value.password) {
      this.commonService.presentToaster("Please provide both username and password");
      return;
    }

    this.commonService.displayLoader("Logging In...").then(loader => {
      this.authService.login(this.loginForm.value.userName, this.loginForm.value.password).then(authData => {
        loader.dismiss();
        if(authData.userId > 0){
          this.commonService.presentToaster("Successfully Logged In");
          this.setHomeAsRoot(authData.userId);
        }else{
          this.commonService.presentToaster("Login Failed");
          this.loginForm.controls['password'].reset();
        }
      }).catch(rej => {
        loader.dismiss();
        this.commonService.presentToaster("Login Failed");
        this.loginForm.controls['password'].reset();
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
