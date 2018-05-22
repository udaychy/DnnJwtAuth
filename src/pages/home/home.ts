import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { UserModel } from '../../model/user-model';
import { LoginPage } from '../login/login';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: UserModel;

  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    private authService: AuthProvider,
    private commonService: CommonProvider) {
      this.user = new UserModel();
  }

  
  ionViewDidLoad() {
    this.getUser(this.navParam.data)
  }

  getUser(userId:number){
    this.authService.getUser(userId).subscribe(user => {
      console.log(user);
      this.user = new UserModel(user);
      console.log('user model', this.user);
    })
  }

  logOut(){
    this.authService.logOut().subscribe(() => {
      this.navCtrl.setRoot(LoginPage);
      this.commonService.presentToaster("Successfully Logged Out");
    })
  }

}
