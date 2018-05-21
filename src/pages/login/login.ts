import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginResponse } from '../../model/login-response';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userName: string;
  password: string
  
  constructor(public navCtrl: NavController,
    private authService: AuthProvider) {

  }

  login() {
    if (this.userName && this.password) {
      this.authService.login(this.userName, this.password).subscribe(data => {
        console.log('Login: ', data);
      })
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
