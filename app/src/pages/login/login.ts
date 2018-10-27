import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { Connector } from '../../providers/connector/connector' 
import { SignupPage } from '../signup/signup'
import { HomePage } from '../home/home';
import { Globals } from "../../Globals";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
 
  constructor(private nav: NavController, private connector: Connector, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 
  public createAccount() {
    this.nav.push(SignupPage);
  }
 
  showSpinner = false;
  public login() {
    this.showSpinner = true;
    this.connector.login(this.registerCredentials).subscribe(resp => {
      console.log(resp);
      if (resp) {        
        Globals.email = this.registerCredentials.email;
        this.nav.setRoot(HomePage);
      } else {
        this.showError("Access Denied");
      }
      this.showSpinner = false;
    },
      error => {
        this.showError(error);
        this.showSpinner = false;
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}