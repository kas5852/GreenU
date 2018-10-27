import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { Connector } from '../../providers/connector/connector';
 
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  schools: any[];
  createSuccess = false;
  registerCredentials = { email: '', password: '', school: '', name: ''};
 
  constructor(private nav: NavController, private connector: Connector, private alertCtrl: AlertController) {
    this.schools = ['Columbia University', 'Stevens Institute of Technology', 'University of Maryland College Park', 'University of Texas at Austin'];
   }
 
  public register() {
    this.connector.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}