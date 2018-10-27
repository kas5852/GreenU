import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from "../base/base";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {
    home: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.home = BasePage;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

}
