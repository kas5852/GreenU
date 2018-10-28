import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from "../base/base";
import { LeaderboardPage } from "../leaderboard/leaderboard";
import { AchievementsPage } from '../achievements/achievements';

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
    leaderboard: any;
    achievements: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.home = BasePage;
        this.leaderboard = LeaderboardPage;
        this.achievements = AchievementsPage;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

}
